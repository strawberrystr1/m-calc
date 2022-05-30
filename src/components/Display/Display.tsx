import { DisplayWrapper } from './components'

type Props = {
  currentNumber: string
  expression: string
}

export const Display = ({
  currentNumber,
  expression,
}: Props) => {
  return (
    <DisplayWrapper>
      <p>{expression}</p>
      <p>{currentNumber}</p>
    </DisplayWrapper>
  )
}
