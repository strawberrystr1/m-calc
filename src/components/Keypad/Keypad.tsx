import { buttons } from '@constants/index'
import {
  IKeypadActions,
  IKeypadProps,
} from '@interfaces/props'
import { KeyButton, KeypadWrapper } from './components'

export const Keypad = ({
  actions,
  changeSign,
  negative,
}: IKeypadProps) => {
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
