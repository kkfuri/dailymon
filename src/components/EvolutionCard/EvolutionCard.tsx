import Image from 'next/image'
import NextLink from 'next/link'
import Axios from 'axios'
import { Box, Flex, Heading, Skeleton, Spinner, Stack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import chroma from 'chroma-js'
import { CgArrowDown, CgArrowRight } from 'react-icons/cg'

import { TypeTag } from '@/components'
import { generateAverageColor, generateMainColor } from '@/utils/colors'

const getPokemonUrl = async (url: string): Promise<PokemonAttrs> => {
  const { data } = await Axios.get(url).then(async (res) => {
    return await Axios.get(
      res.data.varieties.filter((i) => i.is_default)[0].pokemon.url
    )
  })
  return data
}

interface EvoCardProps {
  name: string
  url: string
  arrow?: boolean
}

export const EvolutionCard: React.FC<EvoCardProps> = ({ name, url, arrow }) => {
  const { data } = useQuery<PokemonAttrs, Error>(`${url} evo`, () =>
    getPokemonUrl(url)
  )

  const { id, types, sprites } = data || {}
  const number = id ? id.toString().padStart(3, '0') : null
  const formattedTypes = types?.map((i) => i.type.name)
  const mainColor = generateMainColor(formattedTypes)
  const avgColor = generateAverageColor(formattedTypes)

  const backgroundImage = `url(${sprites?.other?.['official-artwork']?.front_default})`
  const backgroundColor = `linear-gradient(150deg, ${chroma(avgColor)
    .brighten(0.8)
    .css()}, ${mainColor})`

  return (
    <NextLink href={id ? `/${id}` : '/'} passHref>
      <Box
        as="a"
        position="relative"
        role="group"
        h={130}
        minH={130}
        w="full"
        borderRadius={12}
        background={[backgroundImage, backgroundColor].join(', ')}
        backgroundRepeat="no-repeat"
        backgroundPosition="80% 40%, center"
        backgroundSize="200px, cover"
        backgroundBlendMode="overlay"
        p={3}
        cursor="pointer"
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
        <Stack
          spacing={2}
          color={chroma(mainColor).darken().hex()}
          transition="color .4s"
          _groupHover={{ color: chroma(mainColor).darken(3).hex() }}
        >
          <Skeleton isLoaded={!!id} w="80%">
            <Heading
              as="h1"
              fontSize={{ base: 28, xl: 32 }}
              textTransform="capitalize"
              isTruncated
            >
              {name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!!id} minW="80px" h="40px">
            {id && (
              <Heading as="h3" fontWeight="normal" fontSize={{ base: 24, xl: 28 }} lineHeight={1} ml={1}>
                #{number}
              </Heading>
            )}
          </Skeleton>
          <Stack isInline spacing={2} h={5} mb={2}>
            {formattedTypes
              ? formattedTypes.map((type) => (
                <TypeTag key={type} type={type} />
              ))
              : new Array(2)
                .fill(true)
                .map((_, index) => (
                  <Skeleton
                    key={`skeleton-${index}`}
                    boxShadow="md"
                    width="46px"
                  />
                ))}
          </Stack>
        </Stack>
        <Box
          position="absolute"
          bottom={0}
          right={-5}
          zIndex={10}
          transition="transform .4s"
          _groupHover={{ transform: 'scale(-1.2, 1.2)' }}
          transform="scaleX(-1)"
        >
          {sprites?.front_default ? (
            <Image
              src={sprites?.front_default}
              width={116}
              height={116}
              quality={100}
            />
          ) : (
            <Flex boxSize={116} alignItems="center" justifyContent="center">
              <Spinner
                size="lg"
                thickness="4px"
                color={chroma(mainColor).brighten().css()}
              />
            </Flex>
          )}
        </Box>
      </Box>
    </NextLink>
  )
}
