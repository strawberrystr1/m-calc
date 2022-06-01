import { Reducer } from '@interfaces/baseTypes'

export const reducer: Reducer = (state, action) => {
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
