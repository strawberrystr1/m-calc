describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Toggle history', () => {
    cy.get('aside').should('not.have.class', 'hide')
    cy.get('[data-test-id=historyToggle]').click()
    cy.get('aside').should('have.class', 'hide')
    cy.get('[data-test-id=historyToggle]').click()
    cy.get('aside').should('not.have.class', 'hide')
  })

  it('User interaction', () => {
    cy.calculateTwoDigits('*', '12', false)
    cy.calculateTwoDigits('-', '1', true)
    cy.get('[data-test-id=historyToggle]').click()
    cy.get('aside').should('have.class', 'hide')
    cy.enterSimpleExpression()
    cy.get('[data-test-id="button-="]').click()
    cy.get('[data-test-id=historyToggle]').click()
    cy.get('[data-test-id=history] > li').should('have.length', 3)
    cy.get('a[href="/class"]').click()
    cy.calculateNaturalDigits('+', '5.7')
    cy.get('[data-test-id="button-CE"]').click()
    cy.get('[data-test-id=display] p:first-child').should('have.text', '')
    cy.get('[data-test-id=display] p:last-child').should('have.text', '0')
    cy.get('[data-test-id=button-1]').click()
    cy.get('[data-test-id=button-1]').click()
    cy.get('[data-test-id=button-C]').click()
    cy.get('[data-test-id=display] p:last-child').should('have.text', '0')
    cy.createFakeHistory(3)
    cy.get('[data-test-id=history] > li').should('have.length', 7)
    cy.get('a[href="/settings"]').click()
    cy.get('select:last-of-type').select('ru')
    cy.get('a[href="/"]').click()
    cy.get('aside h4').should('have.text', 'История операций')
    cy.get('a[href="/class"]').click()
    cy.get('aside h4').should('have.text', 'История операций')
    cy.get('a[href="/settings"]').click()
    cy.get('select:first-of-type').select('dark')
    cy.get('#root').should('have.css', 'background-color', 'rgb(63, 68, 71)')
    cy.get('a[href="/class"]').click()
    cy.get('#root').should('have.css', 'background-color', 'rgb(63, 68, 71)')
    cy.get('aside h4').should('have.css', 'color', 'rgb(255, 255, 255)')
    cy.get('header').should('have.css', 'background-color', 'rgb(245, 245, 245)')
    cy.get('a[href="/settings"]').click()
    cy.get('button').click()
    cy.get('a[href="/"]').click()
    cy.get('[data-test-id=history] > li').should('have.length', 0)
    cy.calculateDifficultExpression()
    cy.get('[data-test-id=history] > li').should('have.length', 1)
    cy.get('a[href="/settings"]').click()
    cy.get('select:last-of-type').select('en')
    cy.get('select:first-of-type').select('light')
    cy.get('#root').should('have.css', 'background-color', 'rgb(245, 245, 245)')
    cy.get('a[href="/settings"]').should('have.text', 'Settings')
    cy.get('button').click()
    cy.get('a[href="/"]').click()
    cy.get('[data-test-id=history] > li').should('have.length', 0)
  })
})