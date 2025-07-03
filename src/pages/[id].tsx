import { NextSeo } from 'next-seo'
import { Box } from '@chakra-ui/react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Axios from 'axios'

import api from '@/utils/api'
import { FeaturedPokemon } from '@/components'
import { generatePokemonSEO, generateStructuredData } from '@/utils/seo'
import { getStaticPaths as getPokemonStaticPaths } from '@/utils/generateStaticPages'

interface PokemonPageProps {
  pokemon: PokemonAttrs | null
  error?: boolean
}

export default function PokemonPage({ pokemon, error }: PokemonPageProps) {
  if (error || !pokemon) {
    return (
      <>
        <NextSeo title="Pokemon Not Found | Dailymon" noindex />
        <Box mx="auto" w={{ base: '80%', md: 'full' }} maxW={{ md: 720 }} py={6}>
          <p>Pokemon not found</p>
        </Box>
      </>
    )
  }

  const seoConfig = generatePokemonSEO(pokemon)
  const structuredData = generateStructuredData(pokemon)

  return (
    <>
      <NextSeo {...seoConfig} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Box mx="auto" w={{ base: '80%', md: 'full' }} maxW={{ md: 720 }} py={6}>
        <FeaturedPokemon {...pokemon} />
      </Box>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return getPokemonStaticPaths()
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const pokemon = await api.get(`/pokemon/${params?.id}`).then((res) => res.data)
    
    return {
      props: {
        pokemon,
      },
      revalidate: 86400, // Revalidate once per day
    }
  } catch (error) {
    return {
      props: {
        pokemon: null,
        error: true,
      },
      revalidate: 3600, // Retry in 1 hour for errors
    }
  }
}
