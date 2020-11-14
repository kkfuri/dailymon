import { extendTheme } from '@chakra-ui/react'

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    body: 'pt sans, sans-serif',
    heading: 'pt sans, sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'body',
        fontSize: 'sm',
        color: 'gray.600',
        lineHeight: 'tall',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'heading',
        fontWeight: 'bold',
      },
    },
  },
})

export default theme
