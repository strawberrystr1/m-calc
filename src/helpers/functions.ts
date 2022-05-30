import {
  AddCommand,
  Calculator,
  DivCommand,
  MulCommand,
  ResDivCommand,
  SubCommand,
} from '@pages/Home/Home'

export const compareBrackets = (
  strs: string[],
): [boolean, number, number] => {
  const str = strs.join('')
  const right = str
    .split('')
    .filter(el => el === '(').length
  const left = str.split('').filter(el => el === ')').length
  return [right >= left, right, left]
}

export const handleEqualInpus = (
  prev: string,
  currentNumber: string,
) => {
  const [_, rightBrackets, leftBrackets] = compareBrackets([
    prev,
    currentNumber,
  ])
  const bracketsToAdd = rightBrackets - leftBrackets

  if (!prev) {
    return `${currentNumber} =`
  } else if (
    !Number(prev[prev.length - 1]) &&
    currentNumber === '0'
  ) {
    return `${prev
      .slice(0, -2)
      .padEnd(prev.length - 2 + bracketsToAdd, ')')}=`
  } else if (prev.includes('=')) {
    return prev
  } else {
    let nextValue = `${prev} ${currentNumber}`
    nextValue =
      nextValue.padEnd(
        nextValue.length + bracketsToAdd,
        ')',
      ) + ' ='
    return nextValue
  }
}

export const handleNextOperand = (
  prev: string,
  currentNumber: string,
  item: string,
) => {
  if (
    /[\+-\\\*%]/.test(prev[prev.length - 1]) &&
    currentNumber === '0'
  ) {
    return `${prev.slice(0, -1)} ${item}`
  }
  if (prev.split(' ').length === 2 && prev.includes('=')) {
    return `${currentNumber} ${item}`
  }
  if (currentNumber === '0') {
    return prev
  }
  if (!prev) {
    return `${currentNumber} ${item}`
  }
  return `${prev} ${currentNumber} ${item}`
}

const getNextValueFromCurrentNumber = (
  current: string,
  next: string,
  negative: boolean,
) => {
  const numberInExpression = current
    .match(/\d*/g)
    ?.filter(el => Number(el))
    .join('')
  let nextValue = ''
  if (negative) {
    if (Number(current)) {
      nextValue = `(-${numberInExpression})`
      return nextValue
    }
    nextValue = current.replace(
      /\(-\d*\)/g,
      `(-${numberInExpression}${next})`,
    )
  } else {
    nextValue = current.replace(
      /\(-\d*\)/g,
      `${numberInExpression}${next}`,
    )
  }
  return nextValue
}

export const handleNextDigit = (
  prev: string,
  item: string,
  negative: boolean,
) => {
  if (negative) {
    if (prev === '0') return `(-${item})`

    if (prev.split('').every(el => el === '('))
      return `${prev}(-${item})`

    return getNextValueFromCurrentNumber(
      prev,
      item,
      negative,
    )
  }
  if (prev === '0') return item
  if (prev.includes('-')) {
    return getNextValueFromCurrentNumber(
      prev,
      item,
      negative,
    )
  }
  return prev + item
}

export const handleNextBracket = (
  item: string,
  prev: string,
  expression?: string,
) => {
  if (item === ')') {
    if (prev === '(') return `(0)`
    if (
      !compareBrackets([
        expression as string,
        prev + item,
      ])[0]
    ) {
      return prev
    } else {
      return prev + item
    }
  } else {
    if (prev === '0') {
      return `${item}`
    } else {
      return `${item}${prev}`
    }
  }
}

export const calculateSimpleExpression = (
  expression: string,
): [string[], string] => {
  const digits = expression.split(
    /\s{1}\+\s{1}|\s{1}\-\s{1}|\s{1}\/\s{1}|\s{1}\*\s{1}|\s{1}%\s{1}/,
  )
  const sign = expression
    .split(' ')
    .find(el => /^\+$|^-$|^\/$|^\*$|^%$/.test(el)) as string
  return [digits, sign]
}

export const getCommand = (
  sign: string,
  digits: string[],
) => {
  let [x, y] = digits
  x = x.replace(/[\(\)]/g, '')
  y = y.replace(/[\(\)]/g, '')
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

const resolveBrackets = (
  expression: string,
  calculator: Calculator,
) => {
  let matches = expression.match(
    /\((?!-)[\d\s\-\+\*\/\%]*\)/g,
  )
  let result = expression
  while (matches) {
    if (Number(matches[0].replace(/[\(\)]/g, ''))) break
    if (matches && matches.length >= 1) {
      matches.forEach((item, i) => {
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
        console.log('result: ', result)
      })
    }
    matches = result.match(/\([\d\s\-\+\*\/\%]*\)/g)
  }
  return result
}

export const calculateExpression = (
  expression: string,
  calculator: Calculator,
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

const calculateSigns = (
  signs: string[],
  calculator: Calculator,
  regexp: RegExp,
) => {
  for (let i = 0; i < signs.length; i++) {
    if (signs.length <= 1) break
    if (regexp.test(signs[i])) {
      const [digits, sign] = calculateSimpleExpression(
        `${signs[i - 1]} ${signs[i]} ${signs[i + 1]}`,
      )
      const command = getCommand(sign, digits)
      if (command) {
        calculator.execute(command)
      }
      signs.splice(i - 1, 3, calculator.getCurrent())
      i = 0
    }
  }
  return signs
}
