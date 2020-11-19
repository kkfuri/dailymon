import { Flex } from '@chakra-ui/react'
import { Nav } from '../nav/nav'

export const Layout = ({ children }) => {
  return (
    <Flex
      id="body"
      flexDir="column"
      minH="100vh"
      bg="#424242 url('./body_bg.png')"
    >
      <Nav />
      {children}
    </Flex>
  )
}
