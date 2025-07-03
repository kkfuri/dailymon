import { NextSeoProps } from 'next-seo'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailymon.com'
const SITE_NAME = 'Dailymon'
const DEFAULT_DESCRIPTION = 'Discover a new Pokemon every day. Explore all Pokemon, their types, stats, and evolution chains with detailed information and beautiful artwork.'

export const defaultSEO: NextSeoProps = {
  title: 'Dailymon - Daily Pokemon Discovery',
  description: DEFAULT_DESCRIPTION,
  canonical: SITE_URL,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    site_name: SITE_NAME,
    title: 'Dailymon - Daily Pokemon Discovery',
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Dailymon - Daily Pokemon Discovery',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    handle: '@dailymon',
    site: '@dailymon',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#3182ce',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
}

export const generatePokemonSEO = (pokemon: PokemonAttrs): NextSeoProps => {
  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  const types = pokemon.types.map(t => t.type.name).join(', ')
  const title = `${pokemonName} - Pokemon #${pokemon.id} | Dailymon`
  const description = `Meet ${pokemonName}, a ${types} type Pokemon. Discover its stats, abilities, and evolution chain. Height: ${pokemon.height/10}m, Weight: ${pokemon.weight/10}kg.`
  const pokemonImage = pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default
  
  return {
    title,
    description,
    canonical: `${SITE_URL}/${pokemon.id}`,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${pokemon.id}`,
      type: 'article',
      images: [
        {
          url: pokemonImage,
          width: 512,
          height: 512,
          alt: `${pokemonName} official artwork`,
          type: 'image/png',
        }
      ],
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: `${pokemon.name}, pokemon, ${types}, pokedex, stats, evolution, ${pokemonName} pokemon`,
      },
    ],
  }
}

export const generateTypeSEO = (typeName: string, pokemonCount?: number): NextSeoProps => {
  const typeNameCap = typeName.charAt(0).toUpperCase() + typeName.slice(1)
  const title = `${typeNameCap} Type Pokemon | Dailymon`
  const description = `Explore all ${typeNameCap} type Pokemon. Discover their unique abilities, stats, and characteristics. ${pokemonCount ? `Browse through ${pokemonCount} amazing ${typeNameCap} Pokemon.` : ''}`
  
  return {
    title,
    description,
    canonical: `${SITE_URL}/type/${typeName}`,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/type/${typeName}`,
      type: 'website',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: `${typeName} pokemon, ${typeName} type, pokemon types, pokedex, ${typeNameCap}`,
      },
    ],
  }
}

export const generateHomeSEO = (dailyPokemon?: PokemonAttrs): NextSeoProps => {
  const pokemonName = dailyPokemon?.name ? 
    dailyPokemon.name.charAt(0).toUpperCase() + dailyPokemon.name.slice(1) : 
    'amazing Pokemon'
  
  const title = dailyPokemon ? 
    `Today's Pokemon: ${pokemonName} | Dailymon` : 
    'Dailymon - Daily Pokemon Discovery'
    
  const description = dailyPokemon ?
    `Today's featured Pokemon is ${pokemonName}! Discover a new Pokemon every day with detailed stats, evolution chains, and beautiful artwork.` :
    DEFAULT_DESCRIPTION

  return {
    title,
    description,
    canonical: SITE_URL,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      type: 'website',
      images: dailyPokemon ? [
        {
          url: dailyPokemon.sprites.other['official-artwork']?.front_default || dailyPokemon.sprites.front_default,
          width: 512,
          height: 512,
          alt: `Today's Pokemon: ${pokemonName}`,
          type: 'image/png',
        }
      ] : undefined,
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'daily pokemon, pokemon of the day, pokedex, pokemon stats, pokemon evolution, pokemon types',
      },
    ],
  }
}

export const generateStructuredData = (pokemon?: PokemonAttrs) => {
  if (!pokemon) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }
  }

  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  const types = pokemon.types.map(t => t.type.name)
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: pokemonName,
    description: `${pokemonName} is a ${types.join(' and ')} type Pokemon from the Pokedex.`,
    identifier: pokemon.id.toString(),
    image: pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default,
    url: `${SITE_URL}/${pokemon.id}`,
    additionalType: 'Pokemon',
    category: types,
    mainEntity: {
      '@type': 'CreativeWork',
      name: `Pokemon #${pokemon.id}: ${pokemonName}`,
      description: `Detailed information about ${pokemonName}, including stats, type, height, and weight.`,
    }
  }
}