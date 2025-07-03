import {
  ReactQueryCacheProvider,
  QueryCache,
  ReactQueryConfigProvider,
} from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'

import theme from '@/utils/theme'
import { Layout } from '@/components'
import { defaultSEO } from '@/utils/seo'

const queryCache = new QueryCache()

const overrides = {
  queries: {
    refetchOnWindowFocus: false,
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <ReactQueryConfigProvider config={overrides}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </ReactQueryCacheProvider>
      </ReactQueryConfigProvider>
    </>
  )
}

export default MyApp
