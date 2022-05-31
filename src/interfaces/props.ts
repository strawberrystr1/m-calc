import { i18n } from 'i18next'
import { TFunction } from 'react-i18next'

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

export interface IClassTranslationProps {
  t: TFunction<'translation', undefined>
  i18n: i18n
}

export type SettingsPageClass = IClassTranslationProps &
  ISettingsPageProps
