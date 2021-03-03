import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Axios from 'axios'

import { FeaturedPoke } from 'src/components/featuredPoke/featuredPoke'
import api from 'src/utils/api'
import { generateMonthlyPokedex, generateDailyPokemon, getHistory } from 'src/utils/history'
import { today } from 'src/utils/date'

export default function Home({ pokemon }) {
  return (
    <>
      <Head>
        <title>Dailymon - every day a new pokemon</title>
      </Head>
      <Box mx="auto" w={{ base: '80%', md: 'full' }} maxW={{ md: 720 }} py={6}>
        {pokemon && <FeaturedPoke {...pokemon} />}
      </Box>
    </>
  )
}

export async function getStaticProps(ctx) {
  if(new Date().getDate() === 1) {
    generateMonthlyPokedex()
  }

  let id = getHistory()[today()]

  if(!id) {
    generateDailyPokemon()
    id = getHistory()[today()]
  }

  const pokemon = await api
    .get(`/pokemon?limit=1&offset=${id}`)
    .then(
      async (res) =>
        await Axios.get(res.data.results?.pop().url).then(({ data }) => data)
    )

  return {
    props: { pokemon },
  }
}
