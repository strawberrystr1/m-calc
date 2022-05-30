import Header from '@components/Header'
import { HOME, SETTINGS } from '@constants/routes'
import { reducer } from '@helpers/reducers'
import { Context, Reducer } from '@interfaces/interfaces'
import Home from '@pages/Home'
import Settings from '@pages/Settings'
import {
  darkTheme,
  lightTheme,
  GlobalStyles,
} from '@theme/index'
import { createContext, useReducer, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ContentWrapper } from './components'

export const HistoryContext = createContext<Context>({
  history: [],
  dispatch: () => ({}),
})

function App() {
  const [theme, setTheme] = useState('light')
  const [showHistory, setShowHistory] = useState(true)
  const [history, dispatch] = useReducer<Reducer, string[]>(
    reducer,
    [],
    arg => arg,
  )

  const changeTheme = (theme: string) => setTheme(theme)
  const toggleHistory = () => setShowHistory(prev => !prev)

  return (
    <ContentWrapper>
      <ThemeProvider
        theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Header />
        <HistoryContext.Provider
          value={{ history, dispatch }}>
          <Routes>
            <Route
              path={HOME}
              element={
                <Home
                  showHistory={showHistory}
                  toggleHistory={toggleHistory}
                />
              }
            />
            <Route
              path={SETTINGS}
              element={
                <Settings
                  changeTheme={changeTheme}
                  theme={theme}
                />
              }
            />
          </Routes>
        </HistoryContext.Provider>
      </ThemeProvider>
    </ContentWrapper>
  )
}

export default App
