import {
  compareBrackets,
  handleEqualInput,
  handleNextOperand,
  handleNextDigit,
  handleNextBracket,
  handleDotInput,
} from './inputHandlers'
import { Calculator } from './calculator'
import {
  Command,
  AddCommand,
  SubCommand,
  MulCommand,
  DivCommand,
  ResDivCommand,
} from './commands'
import {
  calculateExpression,
  calculateSimpleExpression,
} from './calculations'
import { reducer } from './reducers'

export {
  compareBrackets,
  handleEqualInput,
  handleNextOperand,
  handleNextDigit,
  Calculator,
  Command,
  AddCommand,
  SubCommand,
  MulCommand,
  DivCommand,
  ResDivCommand,
  calculateSimpleExpression,
  calculateExpression,
  handleNextBracket,
  reducer,
  handleDotInput,
}
