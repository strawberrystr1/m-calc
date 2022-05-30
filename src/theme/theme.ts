const font = 'sans-serif'

// Color palette
const black = '#000000'
const white = '#ffffff'
const error = '#c86464'
const primary = '#c06c84'
const secondary = '#6c5b7b'
const secondaryLight = '#6a6b7b'
const borderLight = 'grey'
const borderDark = '#f7f9fa'

const defaultTheme = {
  font,
  spaces: [0, 4, 8, 16, 32, 64, 128],
  fontSizes: [12, 14, 16, 20, 24, 32, 40, 56, 72, 80],
  colors: {
    primary,
    secondary,
    secondaryLight,
    black,
    white,
    error,
  },
}

export const lightTheme = {
  ...defaultTheme,
  border: borderLight,
  fontColor: black,
  body: 'whitesmoke',
  headerFont: white,
  headerBg: '#3f4447',
  displayUpper: 'grey',
}

export const darkTheme = {
  ...defaultTheme,
  border: borderDark,
  fontColor: white,
  body: '#3f4447',
  headerFont: black,
  headerBg: 'whitesmoke',
  displayUpper: '#d7dbe0',
}

// export default {
//   font,
//   spaces: [0, 4, 8, 16, 32, 64, 128],
//   fontSizes: [12, 14, 16, 20, 24, 32, 40, 56, 72, 80],
//   colors: {
//     primary,
//     secondary,
//     secondaryLight,
//     black,
//     white,
//     error,
//     light: {
//       borderLight,
//     },
//     dark: {
//       borderDark,
//     },
//   },
// }
