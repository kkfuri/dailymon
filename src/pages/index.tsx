import { Box, SimpleGrid } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { FeaturedPoke } from 'src/components/featuredPoke/featuredPoke'
import { Layout } from 'src/components/layout/layout'
import { Logo } from 'src/components/logo/logo'
import { generateId } from 'src/utils/generateId'
import api from 'src/utils/api'

const getPokemon = async (pokemonId: number): Promise<PokemonAttrs> => {
  const { data } = await api.get(`pokemon/${pokemonId}`)

  return data
}

export default function Home() {
  const pokemonId = generateId()
  const { data, isLoading } = useQuery<PokemonAttrs, Error>(
    pokemonId,
    getPokemon
  )
  return (
    <Layout>
      <Box textAlign="center">
        <Logo />
      </Box>
      {isLoading && 'carregando'}
      <Box mx="auto" py={6}>
        {data && <FeaturedPoke {...data} />}
      </Box>
    </Layout>
  )
}
