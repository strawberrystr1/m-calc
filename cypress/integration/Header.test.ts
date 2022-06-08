describe('Header test', () => {
  beforeEach(() => {
    cy.visit('#/')
  })

  it('Render header', () => {
    cy.get('h1').should('have.text', 'Calculator App')
    cy.get('a').should('have.length', 3)
    cy.get('a.active').should('have.text', 'Home (FC)')
  })

  it('Navigate', () => {
    cy.get('a').contains('Home (CC)').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
    cy.get('a').contains('Settings').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
  })
})