import { Command } from './commands'

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
