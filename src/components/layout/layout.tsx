import { Flex } from '@chakra-ui/react'
import { css } from '@emotion/react'

export const Layout = ({ children }) => {
  return (
    <Flex
      id="body"
      flexDir="column"
      minH="100vh"
      bg="#424242 url('./body_bg.png')"
    >
      {children}
    </Flex>
  )
}
