import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Flex, SimpleGrid, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { useQuery } from 'react-query'
import chroma from 'chroma-js'

import { Pokecard } from 'src/components/pokeCard/pokeCard'
import api from 'src/utils/api'
import { colorByType, idByType } from 'src/utils/constants'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import { useRouter } from 'next/router'

const getPokemon = async (id: string) => {
  return await api.get(`/type/${id}`).then((res) => res.data)
}

export default function All() {
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const { data } = useQuery(router.query.name, getPokemon, {
    enabled: !!router.query.name,
  })

  const paginatedPokemon = useMemo(() => {
    return data?.pokemon?.slice(0, page * 20)
  }, [page, data])

  useInfiniteScroll(() => setPage((value) => value + 1))

  useEffect(() => {
    if (router.query.name) setPage(1)
  }, [router.query.name])

  return (
    <>
      <Head>
        <title>Dailymon - every day a new pokemon</title>
      </Head>
      <Flex flexDir="column" my={12}>
        <Stack
          isInline
          spacing={8}
          maxW={1240}
          mx="auto"
          minH="100vh"
          w="full"
          py={6}
          position="relative"
        >
          <Box position="sticky" h="full" top="30%">
            <SimpleGrid columns={2} gap={4} w={220}>
              {Object.keys(idByType).map((mapType) => {
                const color = colorByType[mapType]
                return (
                  <Button
                    border="1px solid red"
                    borderColor={chroma(color).brighten().hex()}
                    color={
                      router.query.name === mapType
                        ? chroma(color).darken().hex()
                        : chroma(color).brighten().hex()
                    }
                    bg={
                      router.query.name === mapType
                        ? chroma(color).brighten().hex()
                        : 'transparent'
                    }
                    _hover={{
                      bg: chroma(color).brighten().hex(),
                      color: chroma(color).darken(2).hex(),
                    }}
                    onClick={() => router.push(`/type/${mapType}`)}
                  >
                    {mapType}
                  </Button>
                )
              })}
            </SimpleGrid>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6} flex={1}>
            {paginatedPokemon?.map((i) => (
              <Pokecard key={i.pokemon.name} {...i.pokemon} />
            ))}
          </SimpleGrid>
        </Stack>
      </Flex>
    </>
  )
}
