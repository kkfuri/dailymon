interface PokemonAttrs {
  id: number
  name: string
  sprites: {
    front_default: string
    back_default: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: { type: { name: string } }[]
}
