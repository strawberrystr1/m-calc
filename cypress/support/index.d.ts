/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    enterSimpleExpression: () => Chainable<void>;
    clickMultipleTimes: (times: number, selector: string) => Chainable<void>
    calculateTwoDigits: (sign: string, answer: string, negative: boolean) => Chainable<void>
    calculateNaturalDigits: (sign: string, answer: string) => Chainable<void>
    createFakeHistory: (times: number) => Chainable<void>
    calculateDifficultExpression: () => Chainable<void>
  }
}