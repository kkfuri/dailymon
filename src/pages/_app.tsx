import {
  ReactQueryCacheProvider,
  QueryCache,
  ReactQueryConfigProvider,
} from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'

import theme from 'src/utils/theme'

const queryCache = new QueryCache()

const overrides = {
  queries: {
    refetchOnWindowFocus: false,
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryConfigProvider config={overrides}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ReactQueryCacheProvider>
    </ReactQueryConfigProvider>
  )
}

export default MyApp
