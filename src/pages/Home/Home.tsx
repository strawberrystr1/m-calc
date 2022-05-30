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
  Calculator,
  handleDotInput,
  handleEqualInput,
  handleNextBracket,
  handleNextDigit,
  handleNextOperand,
} from '@helpers/index'
import { HistoryContext } from '@App/App'
import { IHomePageProps } from '@interfaces/props'

export const Home = ({
  showHistory,
  toggleHistory,
}: IHomePageProps) => {
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
      setCurrentNumber(handleDotInput(item))
    } else if (Number(item) || item === '0') {
      setCurrentNumber(handleNextDigit(item, negative))
    } else if (item === ')') {
      setCurrentNumber(handleNextBracket(item, expression))
    } else if (item === '(') {
      setCurrentNumber(handleNextBracket(item))
    }
  }

  const handleOperand = (item: string) => {
    if (item === '=') {
      setAfterEqual(true)
      setExpression(handleEqualInput(currentNumber))
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
      setExpression(handleNextOperand(currentNumber, item))
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
