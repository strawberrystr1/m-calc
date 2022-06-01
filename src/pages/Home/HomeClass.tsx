import { Display, DisplayClass } from '@components/Display'
import { HistoryClass } from '@components/History'
import { Keypad, KeypadClass } from '@components/Keypad'
import { HistoryContext } from '@helpers/context'
import {
  handleNextDigit,
  handleNextBracket,
  handleDotInput,
  handleEqualInput,
  handleNextOperand,
  Calculator,
  calculateExpression,
} from '@helpers/index'
import { IHomePageState } from '@interfaces/classState'
import { ContextType } from '@interfaces/baseTypes'
import {
  IHomePageProps,
  IKeypadActions,
} from '@interfaces/props'
import { PageLayout } from '@layouts/index'
import { Component, Context } from 'react'
import {
  HistoryButton,
  HomeAside,
  HomeMain,
  HomeWrapper,
} from './components'

export default class HomeClass extends Component<
  IHomePageProps,
  IHomePageState
> {
  private calculator: Calculator
  private actions: IKeypadActions
  static contextType?: Context<ContextType> = HistoryContext

  constructor(props: IHomePageProps) {
    super(props)
    this.state = {
      currentNumber: '0',
      expression: '',
      negative: false,
      afterEqual: false,
    }

    this.calculator = new Calculator()

    this.actions = Object.create(this, {
      operand: { value: this.handleOperand },
      digit: { value: this.handleDigit },
      action: { value: this.deleteLast },
    })

    this.changeSign = this.changeSign.bind(this)
    this.handleDigit = this.handleDigit.bind(this)
    this.handleOperand = this.handleOperand.bind(this)
    this.deleteLast = this.deleteLast.bind(this)
    this.setNextStringValue =
      this.setNextStringValue.bind(this)
  }

  changeSign() {
    this.setState(prev => ({
      ...prev,
      negative: !prev.negative,
    }))
  }

  setNextStringValue(
    nextValue: string | ((prev: string) => string),
    key: string,
  ) {
    if (typeof nextValue === 'string') {
      this.setState(prev => ({ ...prev, [key]: nextValue }))
    } else {
      this.setState(prev => ({
        ...prev,
        [key]: nextValue(
          prev[
            key as keyof Pick<
              IHomePageState,
              'expression' | 'currentNumber'
            >
          ],
        ),
      }))
    }
  }

  setAfterEqual(value: boolean) {
    this.setState(prev => ({ ...prev, afterEqual: value }))
  }

  handleDigit(item: string) {
    const { afterEqual, negative, expression } = this.state

    if (afterEqual) {
      this.setNextStringValue('', 'expression')
      this.setNextStringValue('0', 'currentNumber')
      this.setAfterEqual(false)
    }
    if (item === '.') {
      this.setNextStringValue(
        handleDotInput(item),
        'currentNumber',
      )
    } else if (Number(item) || item === '0') {
      this.setNextStringValue(
        handleNextDigit(item, negative),
        'currentNumber',
      )
    } else if (item === ')') {
      this.setNextStringValue(
        handleNextBracket(item, expression),
        'currentNumber',
      )
    } else if (item === '(') {
      this.setNextStringValue(
        handleNextBracket(item),
        'currentNumber',
      )
    }
  }

  handleOperand(item: string) {
    const { afterEqual, currentNumber } = this.state

    if (item === '=') {
      this.setAfterEqual(true)
      this.setNextStringValue(
        handleEqualInput(currentNumber),
        'expression',
      )
    } else {
      if (item === '-' && currentNumber === '(') {
        this.setNextStringValue('(-', 'currentNumber')
        return
      }
      if (afterEqual) {
        this.setAfterEqual(false)
        this.setNextStringValue(
          `${currentNumber} ${item}`,
          'expression',
        )
        this.setNextStringValue('0', currentNumber)
        return
      }
      this.setNextStringValue(
        handleNextOperand(currentNumber, item),
        'expression',
      )
    }
    this.setNextStringValue('0', 'currentNumber')
  }

  deleteLast(item: string) {
    this.setNextStringValue('0', 'currentNumber')
    if (item === 'CE') {
      this.setNextStringValue('', 'expression')
      this.calculator.reset()
    }
  }

  componentDidUpdate(
    _: IHomePageProps,
    prevState: IHomePageState,
  ) {
    const { expression } = this.state
    const { dispatch } = this.context as ContextType

    if (prevState.expression !== expression) {
      if (
        expression.includes('=') &&
        expression.split(' ').length > 2
      ) {
        calculateExpression(
          expression.slice(0, -2),
          this.calculator,
        )
        this.setNextStringValue(
          this.calculator.getCurrent(),
          'currentNumber',
        )
        dispatch({
          type: 'ADD',
          payload: expression.slice(0, -2),
        })
      }
    }
  }

  render() {
    const { showHistory, toggleHistory } = this.props
    const { currentNumber, negative, expression } =
      this.state

    return (
      <PageLayout>
        <HomeWrapper>
          <HomeMain className={showHistory ? '' : 'active'}>
            <DisplayClass
              currentNumber={currentNumber}
              expression={expression}
            />
            <KeypadClass
              actions={this.actions}
              changeSign={this.changeSign}
              negative={negative}
            />
          </HomeMain>
          <HomeAside className={showHistory ? '' : 'hide'}>
            <HistoryButton
              data-test-id="history-toggle"
              onClick={toggleHistory}
              className={showHistory ? '' : 'active'}>
              {showHistory ? '>' : '<'}
            </HistoryButton>
            {showHistory && <HistoryClass />}
          </HomeAside>
        </HomeWrapper>
      </PageLayout>
    )
  }
}
