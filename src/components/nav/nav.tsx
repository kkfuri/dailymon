import NextLink from 'next/link'
import { Box, Link, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Logo } from '@/components'

const links = [
  {
    path: '/past',
    label: "Past pokemon",
  },
  {
    path: '/',
    label: "Today's pokemon",
  },
  {
    path: '/all',
    label: 'All pokemons',
  },
]

const Nav = () => {
  const router = useRouter()
  return (
    <Box>
      <Box textAlign="center" mt={4}>
        <Logo />
      </Box>
      <Stack spacing={4} isInline justify="center">
        {links.map(({ path, label }) => (
          <NextLink key={path} href={path} passHref>
            <Link
              aria-current={router.pathname === path}
              color={router.pathname === path ? 'violet.100' : 'white'}
              _hover={{ color: 'violet.200' }}
              _focus={{ boxShadow: 'var(--chakra-colors-violet-shadow) 0px 0px 0px 3px' }}
              px={2}
              textTransform="uppercase"
              letterSpacing="wide"
            >
              {label}
            </Link>
          </NextLink>
        ))}
      </Stack>
    </Box>
  )
}
export { Nav }
