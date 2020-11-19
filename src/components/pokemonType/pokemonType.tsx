import NextLink from 'next/link'
import { Box } from '@chakra-ui/react'
import chroma from 'chroma-js'

import { colorByType } from 'src/utils/constants'

export const PokemonType: React.FC<{ type: string }> = ({ type }) => {
  const color = colorByType[type] || 'white'
  return (
    <NextLink href={`/type/${type}`} passHref>
      <Box
        as="a"
        color={chroma(color).darken(2).hex()}
        bg={chroma(color).brighten(2).hex()}
        borderRadius={4}
        boxShadow="md"
        px={2}
        fontWeight="bold"
        fontSize="xs"
        textTransform="uppercase"
        transition="background-color .4s, color .2s"
        _hover={{
          boxShadow: 'lg',
          bg: chroma(color).darken().hex(),
          color: chroma(color).brighten(4).hex(),
        }}
      >
        {type}
      </Box>
    </NextLink>
  )
}
