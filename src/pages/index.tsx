import { Box, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import Head from 'next/head'
import random from 'lodash.random'
import Axios from 'axios'

import { FeaturedPoke } from 'src/components/featuredPoke/featuredPoke'
import { Layout } from 'src/components/layout/layout'
import { Logo } from 'src/components/logo/logo'
import api from 'src/utils/api'

export default function Home({ pokemon }) {
  return (
    <>
      <Head>
        <title>Dailymon - every day a new pokemon</title>
      </Head>
      <Layout>
        <Box textAlign="center" mt={4}>
          <NextLink href="/">
            <a>
              <Logo />
            </a>
          </NextLink>
        </Box>
        <Box mx="auto" py={6}>
          {pokemon && <FeaturedPoke {...pokemon} />}
        </Box>
        <NextLink href="/all">
          <a>
            <Button
              variant="outline"
              colorScheme="white"
              bg="white"
              position="absolute"
              right={8}
              bottom={8}
            >
              See all
            </Button>
          </a>
        </NextLink>
      </Layout>
    </>
  )
}

export async function getStaticProps(ctx) {
  const id = random(1049)
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
