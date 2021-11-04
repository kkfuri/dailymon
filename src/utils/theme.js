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
  colors: {
    violet: {
      50: '#F1EBFA',
      100: '#D9C6F1',
      200: '#C0A1E8',
      300: '#A87CDE',
      400: '#8F58D5',
      500: '#A87CDE',
      600: '#8F58D5',
      700: '#471F7A',
      800: '#301452',
      900: '#180A29',
      shadow: 'rgb(134, 74, 219, 0.5)',
    },
  },
})

export default theme
