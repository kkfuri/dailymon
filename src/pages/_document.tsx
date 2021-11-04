import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=DotGothic16&family=PT+Sans+Caption&display=swap" rel="stylesheet" />
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
