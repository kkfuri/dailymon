import Image from 'next/image'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import chroma from 'chroma-js'
import Axios from 'axios'
import Link from 'next/link'

import { colorByType } from 'src/utils/constants'
import { PokemonType } from '../pokemonType/pokemonType'

async function getPokemon(url: string): Promise<PokemonAttrs> {
  const { data } = await Axios.get(url)
  return data
}

export const Pokecard = ({ url, name }) => {
  const { data } = useQuery<PokemonAttrs, Error>(name, () => getPokemon(url))

  const { id, types, sprites } = data || {}
  const number = id ? id.toString().padStart(3, '0') : null
  const formattedTypes = types?.map((i) => i.type.name)
  const mainColor = colorByType[formattedTypes?.[0]] || 'white'
  const avgColor =
    formattedTypes?.length > 1
      ? chroma.average(formattedTypes.map((i) => colorByType[i]))
      : mainColor

  return (
    <Link href={`/${id}`} passHref>
      <Box
        as="a"
        position="relative"
        role="group"
        h={130}
        w={340}
        p={1}
        cursor="pointer"
        bg={chroma(avgColor).brighten().alpha(0.2).css()}
        borderRadius={12}
        transition="padding .2s"
        _hover={{ p: 0 }}
      >
        <Box
          position="absolute"
          h="full"
          w="full"
          borderRadius={12}
          backgroundImage={`url(${
            sprites?.other?.['official-artwork']?.front_default
          }), linear-gradient(150deg, ${chroma(avgColor)
            .brighten(0.8)
            .css()}, ${mainColor})`}
          backgroundRepeat="no-repeat"
          backgroundPosition="110% 30%,center"
          backgroundSize="200px, cover"
          backgroundBlendMode="soft-light"
          p={3}
        >
          <Stack isInline spacing={2}>
            {formattedTypes?.map((type) => (
              <PokemonType key={type} type={type} />
            ))}
          </Stack>
          <Flex
            alignItems="center"
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
            top={-8}
            right={-10}
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
      </Box>
    </Link>
  )
}
