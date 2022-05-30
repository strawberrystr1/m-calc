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

export const handleEqualInput = (currentNumber: string) => {
  return (prev: string) => {
    const [_, rightBrackets, leftBrackets] =
      compareBrackets([prev, currentNumber])
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
}

export const handleNextOperand = (
  currentNumber: string,
  item: string,
) => {
  return (prev: string) => {
    if (
      /[\+-\\\*%]/.test(prev[prev.length - 1]) &&
      currentNumber === '0'
    ) {
      return `${prev.slice(0, -1)} ${item}`
    }

    if (
      prev.split(' ').length === 2 &&
      prev.includes('=')
    ) {
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
}

export const handleNextDigit = (
  item: string,
  negative: boolean,
) => {
  return (prev: string) => {
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

export const handleNextBracket = (
  item: string,
  expression?: string,
) => {
  return (prev: string) => {
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
}

export const handleDotInput = (item: string) => {
  return (prev: string) => {
    if (prev === '0') {
      return `.`
    }
    if (!prev.includes('.')) {
      return prev + item
    }
    return prev
  }
}
