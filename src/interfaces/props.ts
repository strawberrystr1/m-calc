export interface IHomePageProps {
  showHistory: boolean
  toggleHistory: () => void
}

export interface IDisplayProps {
  currentNumber: string
  expression: string
}

export interface IKeypadActions {
  operand: (item: string) => void
  digit: (item: string) => void
  action: (item: string) => void
}

export interface IKeypadProps {
  actions: IKeypadActions
  changeSign: () => void
  negative: boolean
}

export interface ISettingsPageProps {
  changeTheme: (theme: string) => void
  theme: string
}
