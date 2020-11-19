import Axios from 'axios'
import { useQuery } from 'react-query'
import chroma from 'chroma-js'
import { colorByType } from 'src/utils/constants'
import { Pokecard } from '../pokeCard/pokeCard'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { PokemonType } from '../pokemonType/pokemonType'
import Image from 'next/image'
import { AiOutlineMedicineBox } from 'react-icons/ai'
import { CgArrowDown, CgArrowRight } from 'react-icons/cg'

const getPokemonUrl = async (url: string): Promise<PokemonAttrs> => {
  const { data } = await Axios.get(url).then(async (res) => {
    return await Axios.get(
      res.data.varieties.filter((i) => i.is_default)[0].pokemon.url
    )
  })
  return data
}

interface EvoCardProps {
  url: string
  arrow?: boolean
}

export const EvolutionCard: React.FC<EvoCardProps> = ({ url, arrow }) => {
  const { data } = useQuery<PokemonAttrs, Error>(`${url} evo`, () =>
    getPokemonUrl(url)
  )

  const { id, name, types, sprites } = data || {}
  const number = id ? id.toString().padStart(3, '0') : null
  const formattedTypes = types?.map((i) => i.type.name)
  const mainColor = colorByType[formattedTypes?.[0]] || 'white'
  const avgColor =
    formattedTypes?.length > 1
      ? chroma.average(formattedTypes.map((i) => colorByType[i]))
      : mainColor

  return (
    <Box
      position="relative"
      role="group"
      h={130}
      w="full"
      borderRadius={12}
      background={`linear-gradient(150deg, ${chroma(avgColor)
        .brighten(0.8)
        .css()}, ${mainColor})`}
      p={3}
      cursor="pointer"
      transition="opacity .4s"
      opacity={id ? 1 : 0}
    >
      {arrow && (
        <Box
          position="absolute"
          top={{ base: '-30px', md: '50px' }}
          left={{ base: '45%', md: -8 }}
          background={`linear-gradient(150deg, ${chroma(avgColor)
            .brighten(0.8)
            .css()}, ${mainColor})`}
          borderRadius="full"
          shadow="md"
          zIndex={100}
          color="white"
        >
          <Box display={{ base: 'none', md: 'block' }}>
            <CgArrowRight size="2.8rem" />
          </Box>
          <Box display={{ base: 'block', md: 'none' }}>
            <CgArrowDown size="2.8rem" />
          </Box>
        </Box>
      )}
      <Flex
        flexDir="column"
        color={chroma(mainColor).darken().hex()}
        transition="color .4s"
        _groupHover={{ color: chroma(mainColor).darken(3).hex() }}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="normal"
          textTransform="capitalize"
        >
          {name}
        </Heading>
        {id && (
          <Heading as="h3" size="2xl" ml={1}>
            #{number}
          </Heading>
        )}
      </Flex>
      <Box
        position="absolute"
        bottom={0}
        right={-5}
        zIndex={10}
        transition="transform .4s"
        _groupHover={{ transform: 'scale(1.1)' }}
      >
        {sprites && (
          <Image
            src={sprites?.front_default}
            width={116}
            height={116}
            quality={100}
          />
        )}
      </Box>
    </Box>
  )
}
