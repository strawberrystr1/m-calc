import ErrorBoundary from '@components/ErrorBoundary'
import { Header } from '@components/Header'
import {
  HOME,
  HOME_CLASS,
  SETTINGS,
} from '@constants/routes'
import { HistoryContext } from '@helpers/context'
import { reducer } from '@helpers/reducers'
import { ContextType, Reducer } from '@interfaces/baseTypes'
import { Home, HomeClass } from '@pages/Home'
import { Settings } from '@pages/Settings'
import {
  darkTheme,
  lightTheme,
  GlobalStyles,
} from '@theme/index'
import { useReducer, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ContentWrapper } from './components'
import { ChangeThemeCB } from './types'

function App() {
  const [theme, setTheme] = useState('light')
  const [showHistory, setShowHistory] = useState(true)
  const [history, dispatch] = useReducer<Reducer, string[]>(
    reducer,
    [],
    arg => arg,
  )

  const changeTheme: ChangeThemeCB = theme =>
    setTheme(theme)
  const toggleHistory = () => setShowHistory(prev => !prev)

  const context: ContextType = { history, dispatch }

  return (
    <ContentWrapper>
      <ThemeProvider
        theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Header />
        <HistoryContext.Provider value={context}>
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
                <ErrorBoundary fallback="Something went wrong. Try to reload the page">
                  <Settings
                    changeTheme={changeTheme}
                    theme={theme}
                  />
                </ErrorBoundary>
              }
            />
            <Route
              path={HOME_CLASS}
              element={
                <HomeClass
                  showHistory={showHistory}
                  toggleHistory={toggleHistory}
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
