import { GetServerSideProps } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailymon.com'

function generateSiteMap(pokemonIds: number[], types: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Main pages -->
     <url>
       <loc>${SITE_URL}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${SITE_URL}/all</loc>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${SITE_URL}/past</loc>
       <changefreq>daily</changefreq>
       <priority>0.7</priority>
     </url>
     
     <!-- Pokemon type pages -->
     ${types
       .map((type) => {
         return `
       <url>
           <loc>${SITE_URL}/type/${type}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.6</priority>
       </url>`
       })
       .join('')}
       
     <!-- Individual Pokemon pages -->
     ${pokemonIds
       .map((id) => {
         return `
       <url>
           <loc>${SITE_URL}/${id}</loc>
           <changefreq>monthly</changefreq>
           <priority>0.5</priority>
       </url>`
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Generate all Pokemon IDs (1 to 1010 for current Pokemon count)
  const pokemonIds = Array.from({ length: 1010 }, (_, i) => i + 1)
  
  // Pokemon types
  const types = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 
    'dragon', 'dark', 'steel', 'fairy'
  ]

  // Generate the XML sitemap
  const sitemap = generateSiteMap(pokemonIds, types)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap