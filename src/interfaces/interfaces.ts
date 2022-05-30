export interface IReducerAction {
  type: string
  payload: string
}

export type Reducer = (
  state: string[],
  action: IReducerAction,
) => string[]

export interface Context {
  history: string[]
  dispatch: React.Dispatch<IReducerAction>
}
