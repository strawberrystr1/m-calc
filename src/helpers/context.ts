import { ContextType } from '@interfaces/baseTypes'
import { createContext } from 'react'

export const HistoryContext = createContext<ContextType>({
  history: [],
  dispatch: () => ({}),
})
