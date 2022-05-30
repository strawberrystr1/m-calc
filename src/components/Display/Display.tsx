import { IDisplayProps } from '@interfaces/props'
import { DisplayWrapper } from './components'

export const Display = ({
  currentNumber,
  expression,
}: IDisplayProps) => {
  return (
    <DisplayWrapper>
      <p>{expression}</p>
      <p>{currentNumber}</p>
    </DisplayWrapper>
  )
}
