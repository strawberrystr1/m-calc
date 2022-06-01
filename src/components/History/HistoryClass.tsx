import { HistoryContext } from '@helpers/context'
import { IClassTranslationProps } from '@interfaces/props'
import React from 'react'
import { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Heading, List } from './components'

class HistoryClass extends Component<IClassTranslationProps> {
  render() {
    const { t } = this.props
    return (
      <React.Fragment>
        <Heading>{t('history')}</Heading>
        <HistoryContext.Consumer>
          {({ history }) => (
            <List data-test-id="history">
              {history.map(item => (
                <li key={item}>{item}</li>
              ))}
            </List>
          )}
        </HistoryContext.Consumer>
      </React.Fragment>
    )
  }
}

export default withTranslation()(HistoryClass)
