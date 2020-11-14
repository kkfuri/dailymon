import { Box, Button, Flex, Icon, SimpleGrid } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FiPlus } from 'react-icons/fi'

import { useInfiniteQuery } from 'react-query'
import { Layout } from 'src/components/layout/layout'
import { Logo } from 'src/components/logo/logo'
import { Pokecard } from 'src/components/pokeCard/pokeCard'
import api from 'src/utils/api'

const fetchPokemons = (key, cursor = 0) =>
  api.get(`pokemon?limit=21&offset=${cursor}`)

export default function All() {
  const { data, fetchMore, canFetchMore, isFetchingMore } = useInfiniteQuery(
    'allPokemons',
    fetchPokemons,
    {
      getFetchMore: ({ data }) =>
        data.next.split('offset=')[1].split('&limit=')[0],
    }
  )
  return (
    <Layout>
      <NextLink href="/">
        <a>
          <Box textAlign="center" cursor="pointer" mt={4}>
            <Logo />
          </Box>
        </a>
      </NextLink>
      <Flex flexDir="column" my={12}>
        <SimpleGrid columns={3} spacing={6} maxW={1240} mx="auto" py={6}>
          {data &&
            data.map(({ data: group }) =>
              group.results.map((i) => <Pokecard {...i} />)
            )}
        </SimpleGrid>
        <Box mx="auto">
          <Button onClick={() => fetchMore()} isLoading={!!isFetchingMore}>
            See more <Icon as={FiPlus} ml={2} />
          </Button>
        </Box>
      </Flex>
    </Layout>
  )
}
