import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: '"PT Sans Caption", sans-serif',
    heading: '"DotGothic16", sans-serif',
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
