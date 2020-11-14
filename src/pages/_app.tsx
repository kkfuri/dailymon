import { Reset } from 'src/components/reset/reset'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Reset />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
