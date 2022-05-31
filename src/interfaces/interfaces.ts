export interface IReducerAction {
  type: string
  payload: string
}

export type Reducer = (
  state: string[],
  action: IReducerAction,
) => string[]

export interface ContextType {
  history: string[]
  dispatch: React.Dispatch<IReducerAction>
}
