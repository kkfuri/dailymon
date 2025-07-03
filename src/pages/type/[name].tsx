import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Flex, SimpleGrid, Stack } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import chroma from 'chroma-js'

import api from '@/utils/api'
import { idByType } from '@/utils/constants'
import { generateMainColor } from '@/utils/colors'
import { PokemonCard } from '@/components'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { generateTypeSEO } from '@/utils/seo'
import { getTypeStaticPaths } from '@/utils/generateStaticPages'

interface TypePageProps {
  typeData: any
  typeName: string
}

export default function TypePage({ typeData, typeName }: TypePageProps) {
  const router = useRouter()
  const [page, setPage] = useState<number>(1)

  const paginatedPokemon = useMemo(() => {
    return typeData?.pokemon?.slice(0, page * 20)
  }, [page, typeData])

  useInfiniteScroll(() => setPage((value) => value + 1))

  useEffect(() => {
    setPage(1)
  }, [typeName])

  const seoConfig = generateTypeSEO(typeName, typeData?.pokemon?.length)
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${typeName.charAt(0).toUpperCase() + typeName.slice(1)} Type Pokemon`,
    description: `Complete collection of ${typeName} type Pokemon`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dailymon.com'}/type/${typeName}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `${typeName} Pokemon`,
      numberOfItems: typeData?.pokemon?.length || 0,
      description: `List of all ${typeName} type Pokemon`,
    }
  }

  return (
    <>
      <NextSeo {...seoConfig} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Flex flexDir="column" my={12}>
        <Stack
          isInline
          spacing={8}
          maxW={1240}
          mx="auto"
          minH="100vh"
          w="full"
          py={6}
          position="relative"
        >
          <Box position="sticky" h="full" top="30%">
            <SimpleGrid columns={2} gap={4} w={220}>
              {Object.keys(idByType).map((mapType, index) => {
                const color = generateMainColor(mapType)
                return (
                  <Button
                    key={index}
                    border="1px solid red"
                    borderColor={chroma(color).brighten().hex()}
                    color={
                      typeName === mapType
                        ? chroma(color).darken().hex()
                        : chroma(color).brighten().hex()
                    }
                    bg={
                      typeName === mapType
                        ? chroma(color).brighten().hex()
                        : 'transparent'
                    }
                    _hover={{
                      bg: chroma(color).brighten().hex(),
                      color: chroma(color).darken(2).hex(),
                    }}
                    onClick={() => router.push(`/type/${mapType}`)}
                  >
                    {mapType}
                  </Button>
                )
              })}
            </SimpleGrid>
          </Box>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6} flex={1}>
            {paginatedPokemon?.map((i) => (
              <PokemonCard key={i.pokemon.name} {...i.pokemon} />
            ))}
          </SimpleGrid>
        </Stack>
      </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return getTypeStaticPaths()
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const typeData = await api.get(`/type/${params?.name}`).then((res) => res.data)
    
    return {
      props: {
        typeData,
        typeName: params?.name as string,
      },
      revalidate: 86400, // Revalidate once per day
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
