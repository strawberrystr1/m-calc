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
    <KeypadWrapper data-test-id="keypad">
      {buttons.map(item => (
        <KeyButton
          data-test-id={`button-${item.char}`}
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
      <KeyButton
        data-test-id="negative"
        onClick={changeSign}>
        +/-
      </KeyButton>
    </KeypadWrapper>
  )
}
