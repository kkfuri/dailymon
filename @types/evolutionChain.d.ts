interface evolvesToType {
  evolves_to: evolvesToType[]
  is_baby: boolean
  species: {
    name: string
    url: string
  }
}

interface EvolutionChainType {
  id: number
  chain: evolvesToType
}
