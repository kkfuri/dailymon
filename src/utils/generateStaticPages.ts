// Utility to help with static page generation for better SEO
export const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
  'dragon', 'dark', 'steel', 'fairy'
]

export const TOTAL_POKEMON = 1010

export const getAllPokemonIds = (): string[] => {
  return Array.from({ length: TOTAL_POKEMON }, (_, i) => (i + 1).toString())
}

export const getAllTypeNames = (): string[] => {
  return POKEMON_TYPES
}

// For static path generation
export const getStaticPaths = () => {
  return {
    paths: getAllPokemonIds().map(id => ({ params: { id } })),
    fallback: false, // false for better SEO - all paths are pre-generated
  }
}

export const getTypeStaticPaths = () => {
  return {
    paths: getAllTypeNames().map(name => ({ params: { name } })),
    fallback: false,
  }
}