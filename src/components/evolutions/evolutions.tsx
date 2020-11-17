import { SimpleGrid } from '@chakra-ui/react'
import Axios from 'axios'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { EvolutionCard } from '../evoCard/evoCard'

const getEvolutions = async (url: string): Promise<EvolutionChainType> => {
  const { data } = await Axios.get(url).then(async (res) => {
    return await Axios.get(res.data?.evolution_chain?.url)
  })
  return data
}

export const Evolutions = ({ url }) => {
  const { data } = useQuery<EvolutionChainType, Error>(url, getEvolutions, {})

  const possibleEvos = useMemo(() => {
    if (!data?.chain) return null
    let realChain = [data?.chain?.species]
    let actualChain = data?.chain
    do {
      const numberOfEvolutions = actualChain.evolves_to.length || 0
      if (numberOfEvolutions > 0) {
        for (let i = 0; i < numberOfEvolutions; i++) {
          const evolution = actualChain.evolves_to[i]
          realChain = [...realChain, { ...evolution.species }]
        }
      }
      actualChain = actualChain.evolves_to[0]
    } while (actualChain && actualChain.hasOwnProperty('evolves_to'))

    return realChain
  }, [data?.chain])

  return (
    <SimpleGrid
      hidden={possibleEvos?.length === 1}
      columns={possibleEvos?.length}
      spacing={4}
      mx="auto"
      w="full"
      display="flex"
      flexDir={{ base: 'column', md: 'row' }}
      overflow="hidden"
    >
      {possibleEvos?.length <= 3 ? (
        possibleEvos.map((evo, i) => <EvolutionCard {...evo} arrow={i !== 0} />)
      ) : (
        <>
          <EvolutionCard {...possibleEvos?.[0]} />
          <EvolutionCard {...possibleEvos?.[1]} arrow />
          <EvolutionCard {...possibleEvos?.[2]} arrow />
        </>
      )}
    </SimpleGrid>
  )
}
