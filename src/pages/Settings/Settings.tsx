import { PageLayout } from '@layouts/index'
import React, { useContext } from 'react'
import {
  Button,
  Select,
  SettingsWrapper,
} from './components'
import { useTranslation } from 'react-i18next'
import { ISettingsPageProps } from '@interfaces/props'
import { HistoryContext } from '@helpers/context'

export const Settings = ({
  changeTheme,
  theme,
}: ISettingsPageProps) => {
  const { t, i18n } = useTranslation()
  const { dispatch } = useContext(HistoryContext)

  const handleThemeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    changeTheme(e.target.value)
  }

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    i18n.changeLanguage(e.target.value)
  }

  const resetHistory = () =>
    dispatch({ type: 'RESET', payload: '' })

  return (
    <PageLayout>
      <SettingsWrapper>
        <Select
          defaultValue={theme}
          onChange={handleThemeChange}>
          <option value="dark">{t('settings.dark')}</option>
          <option value="light">
            {t('settings.light')}
          </option>
        </Select>
        <Select
          defaultValue={i18n.language}
          onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </Select>
        <Button onClick={resetHistory}>
          {t('settings.btn')}
        </Button>
      </SettingsWrapper>
    </PageLayout>
  )
}
