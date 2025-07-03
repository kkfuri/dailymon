import { Box, Button, Flex, Icon, SimpleGrid } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { NextSeo } from 'next-seo'
import { useInfiniteQuery } from 'react-query'

import { PokemonCard } from '@/components'
import api from '@/utils/api'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

const fetchPokemons = (key, cursor = 0) =>
  api.get(`pokemon?limit=21&offset=${cursor}`)

const pastPokemonSEO = {
  title: 'Past Daily Pokemon - Historical Archive | Dailymon',
  description: 'Explore our archive of past daily Pokemon. Discover which Pokemon were featured on previous days and relive the daily Pokemon journey.',
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dailymon.com'}/past`,
  openGraph: {
    title: 'Past Daily Pokemon - Historical Archive | Dailymon',
    description: 'Explore our archive of past daily Pokemon. Discover which Pokemon were featured on previous days and relive the daily Pokemon journey.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dailymon.com'}/past`,
    type: 'website',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'past pokemon, daily pokemon archive, pokemon history, pokemon calendar, previous pokemon',
    },
  ],
}

export default function Past() {
  const { data, fetchMore, isFetchingMore } = useInfiniteQuery(
    'pastPokemons',
    fetchPokemons,
    {
      getFetchMore: ({ data }) =>
        data.next.split('offset=')[1].split('&limit=')[0],
    }
  )

  useInfiniteScroll(fetchMore)

  return (
    <>
      <NextSeo {...pastPokemonSEO} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Past Daily Pokemon Archive',
            description: 'Historical archive of past daily featured Pokemon',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dailymon.com'}/past`,
            mainEntity: {
              '@type': 'ItemList',
              name: 'Past Pokemon List',
              description: 'Archive of previously featured daily Pokemon',
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
