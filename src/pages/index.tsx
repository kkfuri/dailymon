import { Box, Button } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import NextLink from 'next/link'

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
      <NextLink href="/">
        <a>
          <Box textAlign="center" cursor="pointer">
            <Logo />
          </Box>
        </a>
      </NextLink>
      {isLoading && 'carregando'}
      <Box mx="auto" py={6}>
        {data && <FeaturedPoke {...data} />}
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
  )
}
