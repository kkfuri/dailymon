import Image from 'next/image'
import { Box, Flex, Heading, Skeleton, Spinner, Stack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import chroma from 'chroma-js'
import Axios from 'axios'
import Link from 'next/link'

import { TypeTag } from '@/components'
import { generateAverageColor, generateMainColor } from '@/utils/colors'

async function getPokemon(url: string): Promise<PokemonAttrs> {
  const { data } = await Axios.get(url)
  return data
}

export const PokemonCard = ({ url, name }) => {
  const { data } = useQuery<PokemonAttrs, Error>(name, () => getPokemon(url))

  const { id, types, sprites } = data || {}
  const number = id ? id.toString().padStart(3, '0') : null
  const formattedTypes = types?.map((i) => i.type.name)

  const mainColor = generateMainColor(formattedTypes?.[0], {
    randomDefault: true,
  })
  const avgColor = generateAverageColor(formattedTypes)

  return (
    <Link href={id ? `/${id}` : '/'} passHref>
      <Box
        as="a"
        position="relative"
        role="group"
        h={130}
        w={340}
        maxW="full"
        borderRadius={12}
        backgroundImage={`url(${sprites?.other?.['official-artwork']?.front_default
          }), linear-gradient(150deg, ${chroma(avgColor)
            .brighten(0.8)
            .css()}, ${mainColor})`}
        backgroundRepeat="no-repeat"
        backgroundPosition="110% 30%,center"
        backgroundSize="200px, cover"
        backgroundBlendMode="soft-light"
        p={3}
      >
        <Stack isInline spacing={2} h={5} mb={2}>
          {formattedTypes
            ? formattedTypes.map((type) => <TypeTag key={type} type={type} />)
            : new Array(2)
              .fill(true)
              .map((_, index) => (
                <Skeleton
                  key={`skeleton-${index}`}
                  boxShadow="md"
                  startColor={mainColor}
                  endColor={chroma(mainColor).brighten().css()}
                  width="48px"
                />
              ))}
        </Stack>
        <Skeleton
          isLoaded={!!id}
          startColor={mainColor}
          endColor={chroma(mainColor).brighten().css()}
        >
          <Flex
            alignItems="center"
            h="72px"
            color={chroma(mainColor).darken().hex()}
            transition="color .4s"
            _groupHover={{
              color: chroma(mainColor).brighten(3).hex(),
            }}
          >
            <Heading
              as="h1"
              size="lg"
              maxH="60px"
              overflow="hidden"
              fontWeight="normal"
              textTransform="capitalize"
              transition="letter-spacing .4s"
              cursor="unset"
              _groupHover={{
                letterSpacing: 'wide',
              }}
            >
              {name}
            </Heading>
            <Heading as="h3" size="2xl" ml={2} cursor="unset">
              #{number}
            </Heading>
          </Flex>
        </Skeleton>
        <Box
          position="absolute"
          top={-8}
          right={-10}
          zIndex={10}
          transition="transform .4s"
          _groupHover={{ transform: 'scale(1.1)' }}
        >
          {sprites?.front_default && (
            <Image
              src={sprites?.front_default}
              width={116}
              height={116}
              quality={100}
            />
          )}

          {!id && (
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
    </Link>
  )
}
