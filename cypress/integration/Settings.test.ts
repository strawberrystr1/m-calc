describe('Settings page tests', () => {
  beforeEach(() => {
    cy.visit('#/settings')
  })
  
  it('Page render', () => {
    cy.get('select').should('have.length', 2)
    cy.get('button').should('have.text', 'Reset history')
  })

  it('Theme select works', () => {
    cy.get('select[data-test-id=theme]').select('dark')
    cy.get('#root').should('have.css', 'background-color', 'rgb(63, 68, 71)')
    cy.get('select[data-test-id=theme]').select('light')
    cy.get('#root').should('have.css', 'background-color', 'rgb(245, 245, 245)')
  })

  it('Language select works', () => {
    cy.get('select[data-test-id=language]').select('ru')
    cy.get('select[data-test-id=language]').should('have.value', 'ru')
    cy.get('button').should('have.text', 'Очистить историю')
    cy.get('header').contains('Настройки')
    cy.get('select[data-test-id=language]').select('en')
    cy.get('select[data-test-id=language]').should('have.value', 'en')
    cy.get('button').should('have.text', 'Reset history')
    cy.get('header').contains('Settings')
  })

  it('Clear history button', () => {
    cy.visit('#/')
    cy.createFakeHistory(5)
    cy.get('[data-test-id=history] > li').should('have.length', 5)
    cy.visit('#/settings')
    cy.get('button').click()
    cy.visit('#/')
    cy.get('[data-test-id=history] > li').should('have.length', 0)
  })

  it('Language in whole app', () => {
    cy.get('select[data-test-id=language]').select('ru')
    cy.get('button').should('have.text', 'Очистить историю')
    cy.get('a[href="#/"]').should('have.text', 'На главную (ФК)').click()
    cy.get('h4').should('have.text', 'История операций')
    cy.get('a[href="#/class"]').should('have.text', 'На главную (КК)').click()
    cy.get('a[href="#/settings"]').should('have.text', 'Настройки').click()
  })
})