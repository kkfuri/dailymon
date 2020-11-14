import { css, Global } from '@emotion/react'
import reset from 'src/utils/reset'

export const Reset: React.FC = () => {
  return (
    <Global
      styles={css`
        ${reset}

        *, *::after, *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
        }
      `}
    />
  )
}
