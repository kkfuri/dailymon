import { Box, SimpleGrid } from '@chakra-ui/react'

import { useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { Layout } from 'src/components/layout/layout'
import { Logo } from 'src/components/logo/logo'
import { Pokecard } from 'src/components/pokeCard/pokeCard'
import api from 'src/utils/api'

const fetchPokemons = (key, cursor = 0) => {
  console.log(cursor)
  return api.get(`pokemon?limit=20&offset=${cursor}`)
}
export default function All() {
  const [page, setPage] = useState(0)
  const { data, fetchMore, canFetchMore, isFetchingMore } = useInfiniteQuery(
    'allPokemons',
    fetchPokemons,
    {
      getFetchMore: (lastCall) => {
        console.log(lastCall)
        return lastCall?.data.next.split('offset=')[1].split('&limit=')[0]
      },
    }
  )
  return (
    <Layout>
      <Box textAlign="center">
        <Logo />
      </Box>
      <SimpleGrid columns={3} spacing={6} maxW={1240} mx="auto" py={6}>
        {data &&
          data.map(({ data: group }) =>
            group.results.map((i) => <Pokecard {...i} />)
          )}
      </SimpleGrid>
      <button
        onClick={() => fetchMore()}
        disabled={!canFetchMore || isFetchingMore}
      >
        load more
      </button>
    </Layout>
  )
}
