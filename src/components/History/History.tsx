import { HistoryContext } from '@App/App'
import React, { useContext } from 'react'
import { Heading, List } from './components'
import { useTranslation } from 'react-i18next'

export const History = () => {
  const { history } = useContext(HistoryContext)
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <Heading>{t('history')}</Heading>
      <List>
        {history.map(item => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </React.Fragment>
  )
}
