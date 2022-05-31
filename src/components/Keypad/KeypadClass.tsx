import { buttons } from '@constants/index'
import {
  IKeypadActions,
  IKeypadProps,
} from '@interfaces/props'
import { Component } from 'react'
import { KeyButton, KeypadWrapper } from './components'

export default class KeypadClass extends Component<IKeypadProps> {
  render() {
    const { actions, negative, changeSign } = this.props

    return (
      <KeypadWrapper>
        {buttons.map(item => (
          <KeyButton
            key={item.char}
            onClick={() =>
              actions[item.type as keyof IKeypadActions](
                item.char,
              )
            }>
            {negative && !!Number(item.char) && '-'}
            {item.char}
          </KeyButton>
        ))}
        <KeyButton onClick={changeSign}>+/-</KeyButton>
      </KeypadWrapper>
    )
  }
}
