import Header from '@components/Header'
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

type ReducerAction = {
  type: string
  payload: string
}

type Reducer = (
  state: string[],
  action: ReducerAction,
) => string[]

type Context = {
  history: string[]
  dispatch: React.Dispatch<ReducerAction>
}

export const HistoryContext = createContext<Context>({
  history: [],
  dispatch: () => ({}),
})

const reducer: Reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'ADD':
      return [...state, payload]
    case 'RESET':
      return []
    default:
      return state
  }
}

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
              path="/"
              element={
                <Home
                  showHistory={showHistory}
                  toggleHistory={toggleHistory}
                />
              }
            />
            <Route
              path="/settings"
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
