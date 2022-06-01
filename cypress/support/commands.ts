// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('enterSimpleExpression', () => {
  cy.get('[data-test-id=button-5]').click()
  cy.get("[data-test-id='button-/']").click()
  cy.get('[data-test-id=button-1]').click()
  cy.get("[data-test-id='button-*']").click()
  cy.get('[data-test-id=button-5]').click()
  cy.get("[data-test-id='button-+']").click()
  cy.get('[data-test-id=button-6]').click()
  cy.get("[data-test-id='button-%']").click()
  cy.get('[data-test-id=button-5]').click()
})

Cypress.Commands.add('clickMultipleTimes', (times, selector) => {
  for (let i = 0; i < times; i++) {
    cy.get(selector).click()
  }
})

Cypress.Commands.add('calculateTwoDigits', (sign, answer, negative) => {
  if (negative) {
    cy.get("[data-test-id=negative]").click()
  }
  cy.get("[data-test-id='button-3']").click()
  cy.get(`[data-test-id='button-${sign}']`).click()
  cy.get("[data-test-id='button-4']").click()
  cy.get("[data-test-id='button-=']").click()
  cy.get('[data-test-id=display] p:last-child').should('have.text', answer)
  if (negative) {
    cy.get("[data-test-id=negative]").click()
  }
})

Cypress.Commands.add('calculateNaturalDigits', (sign, answer) => {
  cy.get("[data-test-id='button-1']").click()
  cy.get("[data-test-id='button-.']").click()
  cy.get("[data-test-id='button-3']").click()
  cy.get(`[data-test-id='button-${sign}']`).click()
  cy.get("[data-test-id='button-4']").click()
  cy.get("[data-test-id='button-.']").click()
  cy.get("[data-test-id='button-4']").click()
  cy.get("[data-test-id='button-=']").click()
  cy.get('[data-test-id=display] p:last-child').should('have.text', answer)
})

Cypress.Commands.add('createFakeHistory', (times) => {
  for (let i = 0; i < times; i++) {
    if (Math.random() > 0.5) {
      cy.enterSimpleExpression()
    } else if (Math.random() >= 0.3) {
      cy.calculateTwoDigits('+', '7', false)
    } else {
      cy.calculateNaturalDigits('*', '5.720')
    }
    cy.get("[data-test-id='button-=']").click()
  }
})

Cypress.Commands.add('calculateDifficultExpression', () => {
  cy.get("[data-test-id='button-(']").click()
  cy.get("[data-test-id='button-(']").click()
  cy.get("[data-test-id='button-(']").click()
  cy.get("[data-test-id='button-4']").click()
  cy.get("[data-test-id='button-1']").click()
  cy.get("[data-test-id='button-*']").click()
  cy.get("[data-test-id='button-3']").click()
  cy.get("[data-test-id='button-3']").click()
  cy.get("[data-test-id='button-+']").click()
  cy.get("[data-test-id='button-1']").click()
  cy.get("[data-test-id='button-3']").click()
  cy.get("[data-test-id='button-)']").click()
  cy.get("[data-test-id='button--']").click()
  cy.get("[data-test-id='button-2']").click()
  cy.get("[data-test-id='button-2']").click()
  cy.get("[data-test-id='button-2']").click()
  cy.get("[data-test-id='button-*']").click()
  cy.get("[data-test-id='button-1']").click()
  cy.get("[data-test-id='button-7']").click()
  cy.get("[data-test-id='button-3']").click()
  cy.get("[data-test-id='button-)']").click()
  cy.get("[data-test-id='button-/']").click()
  cy.get("[data-test-id='button-1']").click()
  cy.get("[data-test-id='button-2']").click()
  cy.get("[data-test-id='button-+']").click()
  cy.get("[data-test-id='button-7']").click()
  cy.get("[data-test-id='button-9']").click()
  cy.get("[data-test-id='button-)']").click()
  cy.get("[data-test-id='button-*']").click()
  cy.get("[data-test-id='button-.']").click()
  cy.get("[data-test-id='button-8']").click()
  cy.get("[data-test-id='button-8']").click()
  cy.get("[data-test-id='button-=']").click()
  cy.get('[data-test-id=display] p:last-child').should('have.text', '-2646.747')
})