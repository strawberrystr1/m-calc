import { createGlobalStyle } from 'styled-components'

interface GlobalTheme {
  [x: string]: string
}

export default createGlobalStyle<{
  theme: GlobalTheme
}>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 100%;
  }

  body {
    & > #root {
      width: 100%;
      height: 100%;
    }
  }

  body {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  #root {
    display: flex;
    background: ${({ theme }) => theme.body};
  }
`
