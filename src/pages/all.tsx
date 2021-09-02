import { Box, Button, Flex, Icon, SimpleGrid } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import Head from 'next/head'
import { useInfiniteQuery } from 'react-query'

import { PokemonCard } from '@/components'
import api from '@/utils/api'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

const fetchPokemons = (key, cursor = 0) =>
  api.get(`pokemon?limit=21&offset=${cursor}`)

export default function All() {
  const { data, fetchMore, isFetchingMore } = useInfiniteQuery(
    'allPokemons',
    fetchPokemons,
    {
      getFetchMore: ({ data }) =>
        data.next.split('offset=')[1].split('&limit=')[0],
    }
  )

  useInfiniteScroll(fetchMore)

  return (
    <>
      <Head>
        <title>Dailymon - every day a new pokemon</title>
      </Head>
      <Flex flexDir="column" my={12}>
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          spacing={6}
          maxW={1240}
          mx="auto"
          py={6}
          minH="100vh"
        >
          {data &&
            data.map(({ data: group }) =>
              group.results.map((i) => <PokemonCard key={i.name} {...i} />)
            )}
        </SimpleGrid>
        <Box mx="auto">
          <Button
            onClick={() => fetchMore()}
            size="lg"
            isLoading={!!isFetchingMore}
          >
            See more <Icon as={FiPlus} ml={2} />
          </Button>
        </Box>
      </Flex>
    </>
  )
}
