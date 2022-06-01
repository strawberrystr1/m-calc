import { PageLayout } from '@layouts/index'
import {
  HistoryButton,
  HomeAside,
  HomeMain,
  HomeWrapper,
} from './components'
import { Display } from '@components/Display'
import { History } from '@components/History'
import { Keypad } from '@components/Keypad'
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
import {
  IHomePageProps,
  IKeypadActions,
} from '@interfaces/props'
import { HistoryContext } from '@helpers/context'
import { HandleInput } from './types'

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

  const handleDigit: HandleInput = item => {
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

  const handleOperand: HandleInput = item => {
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

  const deleteLast: HandleInput = item => {
    setCurrentNumber('0')
    if (item === 'CE') {
      setExpression('')
      calculator.reset()
    }
  }

  const actions: IKeypadActions = {
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
            data-test-id="historyToggle"
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
