import {
  AddCommand,
  DivCommand,
  MulCommand,
  ResDivCommand,
  SubCommand,
} from '.'
import {
  CalculateExpression,
  CalculateSigns,
  CalculateSimpleExpression,
  GetCommand,
  ResolveBrackets,
} from './types'

export const calculateSimpleExpression: CalculateSimpleExpression =
  expression => {
    const digits = expression.split(
      /\s{1}\+\s{1}|\s{1}\-\s{1}|\s{1}\/\s{1}|\s{1}\*\s{1}|\s{1}%\s{1}/,
    )

    const sign = expression
      .split(' ')
      .find(el =>
        /^\+$|^-$|^\/$|^\*$|^%$/.test(el),
      ) as string

    return [digits, sign]
  }

export const getCommand: GetCommand = (sign, digits) => {
  const [x, y] = digits
  switch (sign) {
    case '+': {
      return new AddCommand(+x, +y)
    }
    case '-': {
      return new SubCommand(+x, +y)
    }
    case '*': {
      return new MulCommand(+x, +y)
    }
    case '/': {
      return new DivCommand(+x, +y)
    }
    case '%': {
      return new ResDivCommand(+x, +y)
    }
  }
}

const resolveBrackets: ResolveBrackets = (
  expression,
  calculator,
) => {
  let matches = expression.match(
    /\((?!-)[\d\s\-\+\*\/\%]*\)/g,
  )
  let result = expression
  while (matches) {
    if (Number(matches[0].replace(/[\(\)]/g, ''))) break

    if (matches && matches.length >= 1) {
      matches.forEach(item => {
        const signs = item.split(' ')

        const minorSigns = calculateSigns(
          signs,
          calculator,
          /\*|\/|%/,
        )

        const afterCalc = calculateSigns(
          minorSigns,
          calculator,
          /^\+$|^-$/,
        )

        const toReg = item
          .split('')
          .map(char => {
            if (/[\-\+\*\/\%]/.test(char)) {
              return `\\${char}`
            }
            return char
          })
          .join('')

        const reg = new RegExp(
          `\\${toReg.slice(0, -1)}\\)`,
          'g',
        )

        result = result.replace(reg, afterCalc[0])
      })
    }
    matches = result.match(/\([\d\s\-\+\*\/\%]*\)/g)
  }
  return result
}

export const calculateExpression: CalculateExpression = (
  expression,
  calculator,
) => {
  const expressionWOBrackets = resolveBrackets(
    expression,
    calculator,
  )
  const signs = expressionWOBrackets.split(' ')
  const minorSigns = calculateSigns(
    signs,
    calculator,
    /\*|\/|%/,
  )
  calculateSigns(minorSigns, calculator, /^\+$|^-$/)
}

const calculateSigns: CalculateSigns = (
  signs,
  calculator,
  regexp,
) => {
  for (let i = 0; i < signs.length; i++) {
    if (signs.length <= 1) break
    if (regexp.test(signs[i])) {
      const [digits, sign] = calculateSimpleExpression(
        `${signs[i - 1]} ${signs[i]} ${signs[i + 1]}`,
      )
      const command = getCommand(
        sign,
        digits.map(el => el.replace(/[\(\)]/g, '')),
      )
      if (command) {
        calculator.execute(command)
      }
      signs.splice(i - 1, 3, calculator.getCurrent())
      i = 0
    }
  }
  return signs
}
