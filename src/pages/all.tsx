import { Box, Button, Flex, Icon, SimpleGrid } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { NextSeo } from 'next-seo'
import { useInfiniteQuery } from 'react-query'

import { PokemonCard } from '@/components'
import api from '@/utils/api'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

const fetchPokemons = (key, cursor = 0) =>
  api.get(`pokemon?limit=21&offset=${cursor}`)

const allPokemonSEO = {
  title: 'All Pokemon - Complete Pokedex | Dailymon',
  description: 'Browse through all Pokemon in our complete Pokedex. Discover stats, types, abilities, and evolution chains for every Pokemon from all generations.',
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dailymon.com'}/all`,
  openGraph: {
    title: 'All Pokemon - Complete Pokedex | Dailymon',
    description: 'Browse through all Pokemon in our complete Pokedex. Discover stats, types, abilities, and evolution chains for every Pokemon from all generations.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dailymon.com'}/all`,
    type: 'website',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'pokemon list, all pokemon, pokedex, pokemon database, pokemon search, pokemon stats, pokemon types',
    },
  ],
}

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
      <NextSeo {...allPokemonSEO} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'All Pokemon - Complete Pokedex',
            description: 'Complete collection of all Pokemon with detailed information',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dailymon.com'}/all`,
            mainEntity: {
              '@type': 'ItemList',
              name: 'Pokemon List',
              description: 'Complete list of all Pokemon',
            }
          }),
        }}
      />
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
