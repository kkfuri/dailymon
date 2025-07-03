import { Box, SimpleGrid } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Axios from 'axios'

import api from '@/utils/api'
import { getThreeDayRangePokemons } from '@/utils/history'
import { WhosThatPokemon, FeaturedPokemon } from '@/components'
import { generateHomeSEO, generateStructuredData } from '@/utils/seo'

export default function Home({ dailymon, yesterdaymon, tomorrowmon }) {
  const seoConfig = generateHomeSEO(dailymon)
  const structuredData = generateStructuredData(dailymon)

  return (
    <>
      <NextSeo {...seoConfig} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Box mx="auto" w={{ base: '80%', md: 'full' }} maxW={720} py={6}>
        {dailymon && <FeaturedPokemon {...dailymon} />}
      </Box>
    </>
  )
}

export async function getStaticProps(ctx) {
  const [today, tomorrow, yesterday] = getThreeDayRangePokemons()

  const promiseGen = (date) => {
    return api
      .get(`/pokemon?limit=1&offset=${date - 1}`)
      .then(
        async (res) =>
          await Axios.get(res.data.results?.pop().url).then(({ data }) => data)
      )
  }

  const calls = [promiseGen(today), promiseGen(tomorrow), promiseGen(yesterday)]
  const [dailymon, tomorrowmon, yesterdaymon] = await Promise.all(calls)

  return {
    props: { dailymon, tomorrowmon, yesterdaymon },
    revalidate: 3600, // Revalidate every hour for better SEO
  }
}
