import { PageLayout } from '@layouts/index'
import {
  HistoryButton,
  HomeAside,
  HomeMain,
  HomeWrapper,
} from './components'
import Display from '@components/Display'
import History from '@components/History'
import Keypad from '@components/Keypad'
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  calculateExpression,
  handleEqualInpus,
  handleNextBracket,
  handleNextDigit,
  handleNextOperand,
} from '@helpers/functions'
import { HistoryContext } from '@App/App'

class Command {
  execute: () => number
  constructor(execute: () => number) {
    this.execute = execute
  }
}

export class Calculator {
  private current = 0
  contructor() {
    this.current = 0
  }

  execute(command: Command) {
    this.current = command.execute()
  }

  getCurrent() {
    if (Number.isInteger(this.current)) {
      return this.current.toString()
    }
    const [, fraction] = this.current.toString().split('.')
    if (fraction && fraction.length > 3) {
      return this.current.toFixed(3)
    }
    return this.current.toString()
  }

  reset() {
    this.current = 0
  }
}

export class AddCommand {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  execute() {
    return this.x + this.y
  }
}

export class SubCommand {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  execute() {
    return this.x - this.y
  }
}

export class MulCommand {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  execute() {
    return this.x * this.y
  }
}

export class DivCommand {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  execute() {
    return this.x / this.y
  }
}

export class ResDivCommand {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  execute() {
    return this.x % this.y
  }
}

type Props = {
  showHistory: boolean
  toggleHistory: () => void
}

export const Home = ({
  showHistory,
  toggleHistory,
}: Props) => {
  const [currentNumber, setCurrentNumber] = useState('0')
  const [expression, setExpression] = useState('')
  const [negative, setNeagtive] = useState(false)
  const [afterEqual, setAfterEqual] = useState(false)
  const { dispatch } = useContext(HistoryContext)
  const calculator = useMemo(() => new Calculator(), [])

  const changeSign = () => setNeagtive(prev => !prev)

  const handleDigit = (item: string) => {
    if (afterEqual) {
      setExpression('')
      setCurrentNumber('0')
      setAfterEqual(false)
    }
    if (item === '.') {
      setCurrentNumber(prev => {
        if (prev === '0') {
          return `.`
        }
        if (!prev.includes('.')) {
          return prev + item
        }
        return prev
      })
    } else if (Number(item) || item === '0') {
      setCurrentNumber(prev =>
        handleNextDigit(prev, item, negative),
      )
    } else if (item === ')') {
      setCurrentNumber(prev =>
        handleNextBracket(item, prev, expression),
      )
    } else if (item === '(') {
      setCurrentNumber(prev =>
        handleNextBracket(item, prev),
      )
    }
  }

  const handleOperand = (item: string) => {
    if (item === '=') {
      setAfterEqual(true)
      setExpression(prev =>
        handleEqualInpus(prev, currentNumber),
      )
    } else {
      if (item === '-' && currentNumber === '(') {
        setCurrentNumber('(-')
        return
      }
      if (afterEqual) {
        setAfterEqual(false)
        setExpression(`${currentNumber} ${item}`)
        setCurrentNumber('0')
        return
      }
      setExpression(prev =>
        handleNextOperand(prev, currentNumber, item),
      )
    }
    setCurrentNumber('0')
  }

  const deleteLast = (item: string) => {
    setCurrentNumber('0')
    if (item === 'CE') {
      setExpression('')
      calculator.reset()
    }
  }

  const actions = {
    operand: handleOperand,
    digit: handleDigit,
    action: deleteLast,
  }

  useEffect(() => {
    if (
      expression.includes('=') &&
      expression.split(' ').length > 2
    ) {
      calculateExpression(
        expression.slice(0, -2),
        calculator,
      )
      setCurrentNumber(calculator.getCurrent())
      dispatch({
        type: 'ADD',
        payload: expression.slice(0, -2),
      })
    }
  }, [expression])

  return (
    <PageLayout>
      <HomeWrapper>
        <HomeMain className={showHistory ? '' : 'active'}>
          <Display
            currentNumber={currentNumber}
            expression={expression}
          />
          <Keypad
            actions={actions}
            changeSign={changeSign}
            negative={negative}
          />
        </HomeMain>
        <HomeAside className={showHistory ? '' : 'hide'}>
          <HistoryButton
            onClick={toggleHistory}
            className={showHistory ? '' : 'active'}>
            {showHistory ? '>' : '<'}
          </HistoryButton>
          {showHistory && <History />}
        </HomeAside>
      </HomeWrapper>
    </PageLayout>
  )
}
