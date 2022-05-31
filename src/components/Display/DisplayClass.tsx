import { IDisplayProps } from '@interfaces/props'
import { Component } from 'react'
import { DisplayWrapper } from './components'

export default class DisplayClass extends Component<IDisplayProps> {
  render() {
    const { expression, currentNumber } = this.props
    return (
      <DisplayWrapper>
        <p>{expression}</p>
        <p>{currentNumber}</p>
      </DisplayWrapper>
    )
  }
}
