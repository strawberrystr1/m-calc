describe('History test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('History render', () => {
    cy.get('[data-test-id=history]').siblings('h4').should('have.text', 'History')
  })

  it('Add to history after calculation', () => {
    cy.createFakeHistory(5)
    cy.get('[data-test-id=history] > li').should('have.length', 5)
  })
})