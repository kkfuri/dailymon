import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon and PWA manifest */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3182ce" />
          <meta name="msapplication-TileColor" content="#3182ce" />
          <meta name="theme-color" content="#3182ce" />
          
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://raw.githubusercontent.com" />
          <link rel="preconnect" href="https://pokeapi.co" />
          
          {/* DNS prefetch for better performance */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//raw.githubusercontent.com" />
          <link rel="dns-prefetch" href="//pokeapi.co" />
          
          {/* Fonts */}
          <link 
            href="https://fonts.googleapis.com/css2?family=DotGothic16&family=PT+Sans+Caption&display=swap" 
            rel="stylesheet" 
          />
          
          {/* Custom cursor style */}
          <style global={true}>{`
            *,
            body {
              cursor: url(./cursor.cur), auto;
            }
            button path {
              cursor: pointer;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
