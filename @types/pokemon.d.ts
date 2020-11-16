interface PokemonAttrs {
  id: number
  name: string
  sprites: {
    front_default: string
    back_default: string
    front_shiny: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  stats: {
    base_stat: number
    stat: { name: string }
  }[]
  height: number
  weight: number
  types: { type: { name: string } }[]
  species: any
}
