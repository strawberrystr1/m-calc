describe('Keypad tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('Render keypad', () => {
    cy.get('[data-test-id=keypad] > button').should('have.length', 22)
    for (let i = 0; i < 10; i++) {
      cy.get(`[data-test-id=button-${i}]`).should('have.text', i)
    }
    cy.get(`[data-test-id='button-*']`).should('have.text', '*')
    cy.get(`[data-test-id='button--']`).should('have.text', '-')
    cy.get(`[data-test-id='button-+']`).should('have.text', '+')
    cy.get(`[data-test-id='button-/']`).should('have.text', '/')
    cy.get(`[data-test-id='button-%']`).should('have.text', '%')
    cy.get(`[data-test-id='button-=']`).should('have.text', '=')
    cy.get(`[data-test-id='button-.']`).should('have.text', '.')
    cy.get(`[data-test-id='button-)']`).should('have.text', ')')
    cy.get(`[data-test-id='button-(']`).should('have.text', '(')
    cy.get(`[data-test-id='button-C']`).should('have.text', 'C')
    cy.get(`[data-test-id='button-CE']`).should('have.text', 'CE')
    cy.get(`[data-test-id=negative]`).should('have.text', '+/-')
  })

  it('Toggle negative', () => {
    cy.get(`[data-test-id=negative]`).click()
    for (let i = 1; i < 10; i++) {
      cy.get(`[data-test-id=button-${i}]`).should('have.text', `-${i}`)
    }
    cy.get(`[data-test-id=negative]`).click()
    for (let i = 1; i < 10; i++) {
      cy.get(`[data-test-id=button-${i}]`).should('have.text', i)
    }
  })
})