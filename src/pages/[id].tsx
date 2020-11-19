import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { FeaturedPoke } from 'src/components/featuredPoke/featuredPoke'
import api from 'src/utils/api'

const getPokemon = async (id: string): Promise<PokemonAttrs> => {
  return await api.get(`/pokemon/${id}`).then((res) => res.data)
}

export default function PokemonPage() {
  const router = useRouter()
  const { data, error } = useQuery<PokemonAttrs, Error>(
    router.query.id,
    getPokemon,
    { retry: false }
  )

  if (error) {
    router.push('/')
    // return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <Head>
        <title>Dailymon - every day a new pokemon</title>
      </Head>
      <Box mx="auto" w={{ base: '80%', md: 'full' }} maxW={{ md: 720 }} py={6}>
        <FeaturedPoke {...data} />
      </Box>
    </>
  )
}
