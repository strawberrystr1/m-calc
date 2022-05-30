import buttons from '@constants/index'
import { KeyButton, KeypadWrapper } from './components'

type Actions = {
  operand: (item: string) => void
  digit: (item: string) => void
  action: (item: string) => void
}

type Props = {
  actions: Actions
  changeSign: () => void
  negative: boolean
}

export const Keypad = ({
  actions,
  changeSign,
  negative,
}: Props) => {
  return (
    <KeypadWrapper>
      {buttons.map(item => (
        <KeyButton
          key={item.char}
          onClick={() =>
            actions[item.type as keyof Actions](item.char)
          }>
          {negative && !!Number(item.char) && '-'}
          {item.char}
        </KeyButton>
      ))}
      <KeyButton onClick={changeSign}>+/-</KeyButton>
    </KeypadWrapper>
  )
}
