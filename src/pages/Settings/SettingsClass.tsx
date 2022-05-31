import { HistoryContext } from '@helpers/context'
import { ContextType } from '@interfaces/interfaces'
import { SettingsPageClass } from '@interfaces/props'
import { PageLayout } from '@layouts/index'
import React, { Component } from 'react'
import {
  Button,
  Select,
  SettingsWrapper,
} from './components'

export default class SettingsClass extends Component<SettingsPageClass> {
  static contextType: React.Context<ContextType> =
    HistoryContext

  handleLanguageChange(
    e: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const { i18n } = this.props
    i18n.changeLanguage(e.target.value)
  }

  handleThemeChange(
    e: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const { changeTheme } = this.props
    changeTheme(e.target.value)
  }

  resetHistory() {
    const { dispatch } = this.context as ContextType
    dispatch({ type: 'RESET', payload: '' })
  }

  render() {
    const { t, i18n, theme } = this.props

    return (
      <PageLayout>
        <SettingsWrapper>
          <Select
            defaultValue={theme}
            onChange={this.handleThemeChange}>
            <option value="dark">
              {t('settings.dark')}
            </option>
            <option value="light">
              {t('settings.light')}
            </option>
          </Select>
          <Select
            defaultValue={i18n.language}
            onChange={this.handleLanguageChange}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </Select>
          <Button onClick={this.resetHistory}>
            {t('settings.btn')}
          </Button>
        </SettingsWrapper>
      </PageLayout>
    )
  }
}
