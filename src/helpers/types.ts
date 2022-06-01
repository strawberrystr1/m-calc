import { Calculator } from './calculator'
import {
  AddCommand,
  DivCommand,
  MulCommand,
  ResDivCommand,
  SubCommand,
} from './commands'

export type CalculateSimpleExpression = (
  expression: string,
) => [string[], string]

type Commands =
  | AddCommand
  | SubCommand
  | MulCommand
  | DivCommand
  | ResDivCommand
  | undefined

export type GetCommand = (
  sign: string,
  digits: string[],
) => Commands

export type ResolveBrackets = (
  expression: string,
  calculator: Calculator,
) => string

export type CalculateExpression = (
  expression: string,
  calculator: Calculator,
) => void

export type CalculateSigns = (
  signs: string[],
  calculator: Calculator,
  regexp: RegExp,
) => string[]

export type CompareBrackets = (
  strs: string[],
) => [boolean, number, number]

type SetStateCB<T = string> = (prev: T) => T

export type HandleEqualInput = (
  currentNumber: string,
) => SetStateCB<string>

export type HandleNextOperand = (
  currentNumber: string,
  operand: string,
) => SetStateCB<string>

export type HandleNextDigit = (
  digit: string,
  negative: boolean,
) => SetStateCB<string>

export type GetNextValueFromCurrentNumber = (
  current: string,
  next: string,
  negative: boolean,
) => string

export type HandleNextBracket = (
  bracket: string,
  expression?: string,
) => SetStateCB<string>

export type HandleDotInput = (
  input: string,
) => SetStateCB<string>
