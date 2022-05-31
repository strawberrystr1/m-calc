import { ContextType } from '@interfaces/interfaces'
import { createContext } from 'react'

export const HistoryContext = createContext<ContextType>({
  history: [],
  dispatch: () => ({}),
})
