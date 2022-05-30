import { PageLayout } from '@layouts/index'
import React from 'react'
import {
  Button,
  Select,
  SettingsWrapper,
} from './components'
import { useTranslation } from 'react-i18next'

type Props = {
  changeTheme: (theme: string) => void
  theme: string
}

export const Settings = ({ changeTheme, theme }: Props) => {
  const { t, i18n } = useTranslation()
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
        <Button>{t('settings.btn')}</Button>
      </SettingsWrapper>
    </PageLayout>
  )
}
