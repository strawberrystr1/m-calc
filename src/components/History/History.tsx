import { useContext } from 'react'
import { Heading, List } from './components'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { HistoryContext } from '@helpers/context'

export const History = () => {
  const { history } = useContext(HistoryContext)
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <Heading>{t('history')}</Heading>
      <List data-test-id="history">
        {history.map(item => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </React.Fragment>
  )
}
