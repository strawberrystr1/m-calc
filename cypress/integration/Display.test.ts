describe('Display test', () => {
  beforeEach(() => {
    cy.visit('#/')
  })

  describe('Numbers and operands input', () => {
    it('Display render', () => {
      cy.get('[data-test-id=display] p').should('have.length', 2)
      cy.get('[data-test-id=display] p:last-of-type').should('have.text', '0')
      cy.get('[data-test-id=display]').should('have.css', 'border-bottom', '2px solid rgb(128, 128, 128)')
    })
  
    it('Show current number', () => {
      cy.get('[data-test-id=button-3]').click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '3')
      cy.get('[data-test-id=button-2]').click()
      cy.get('[data-test-id=button-4]').click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '324')
    })
  
    it('Clear current number after clicking operand', () => {
      cy.get('[data-test-id=button-5]').click()
      cy.get("[data-test-id='button-*']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '0')
      cy.get('[data-test-id=button-1]').click()
      cy.get("[data-test-id='button-/']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '0')
      cy.get('[data-test-id=button-6]').click()
      cy.get("[data-test-id='button-+']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '0')
      cy.get('[data-test-id=button-7]').click()
      cy.get("[data-test-id='button--']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '0')
      cy.get('[data-test-id=button-8]').click()
      cy.get("[data-test-id='button-%']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '0')
    })
  
    it("Clear current number after clicking 'C' button", () => {
      cy.get('[data-test-id=button-5]').click()
      cy.get("[data-test-id='button-C']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '0')
    })
  
    it("Clear current number and expression after clicking 'CE' button", () => {
      cy.enterSimpleExpression()
      cy.get("[data-test-id='button-CE']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '0')
      cy.get('[data-test-id=display] p:first-child').should('have.text', '')
    })
  
    it('Expression contains all numbers and operands from input', () => {
      cy.enterSimpleExpression()
      cy.get('[data-test-id=display] p:first-child').should('have.text', '5 / 1 * 5 + 6 %')
    })

    it('Input "." with empty current number', () => {
      cy.get("[data-test-id='button-.']").click()
      cy.get("[data-test-id='button-1']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '.1')
    })

    it('Input "." with non-empty current number', () => {
      cy.get("[data-test-id='button-4']").click()
      cy.get("[data-test-id='button-.']").click()
      cy.get("[data-test-id='button-4']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '4.4')
    })
  })

  describe('Brackets input', () => {
    it('Input ")" with empty current number', () => {
      cy.get("[data-test-id='button-)']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '0')
    })

    it('Input ")" with non-empty current number', () => {
      cy.clickMultipleTimes(3, "[data-test-id='button-1']")
      cy.get("[data-test-id='button-)']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '111')
    })

    it('Input once ")" when current number has only one "("', () => {
      cy.get("[data-test-id='button-(']").click()
      cy.clickMultipleTimes(2, "[data-test-id='button-1']")
      cy.get("[data-test-id='button-)']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '(11)')
    })

    it('Input multiple ")" when current number has only one "("', () => {
      cy.get("[data-test-id='button-(']").click()
      cy.clickMultipleTimes(2, "[data-test-id='button-1']")
      cy.clickMultipleTimes(2, "[data-test-id='button-)']")
      cy.get('[data-test-id=display] p:last-child').should('have.text', '(11)')
    })

    it('Amount of inputs ")" is equal to "(" in current number', () => {
      cy.clickMultipleTimes(4, "[data-test-id='button-(']")
      cy.clickMultipleTimes(2, "[data-test-id='button-1']")
      cy.clickMultipleTimes(5, "[data-test-id='button-)']")
      cy.get('[data-test-id=display] p:last-child').should('have.text', '((((11))))')
    })

    it('Input "(" with empty current number', () => {
      cy.clickMultipleTimes(3, "[data-test-id='button-(']")
      cy.get('[data-test-id=display] p:last-child').should('have.text', '(((')
    })

    it('Input "(" with non-empty current number (numbers first)', () => {
      cy.clickMultipleTimes(2, "[data-test-id='button-1']")
      cy.clickMultipleTimes(3, "[data-test-id='button-(']")
      cy.get('[data-test-id=display] p:last-child').should('have.text', '(((11')
    })

    it('Input "(" with non-empty current number (brackets first)', () => {
      cy.clickMultipleTimes(3, "[data-test-id='button-(']")
      cy.clickMultipleTimes(2, "[data-test-id='button-1']")
      cy.get('[data-test-id=display] p:last-child').should('have.text', '(((11')
    })

    it('Automatic add ")" to expression', () => {
      cy.clickMultipleTimes(6, "[data-test-id='button-(']")
      cy.get("[data-test-id='button-1']").click()
      cy.get("[data-test-id='button-+']").click()
      cy.get("[data-test-id='button-1']").click()
      cy.get("[data-test-id='button-=']").click()
      cy.get('[data-test-id=display] p:first-of-type').should('have.text', '((((((1 + 1)))))) =')
    })
  })
  
  describe('Negative inputs', () => {
    beforeEach(() => {
      cy.get('[data-test-id=negative]').click()
    })

    it('Negative input one number', () => {
      cy.get("[data-test-id='button-2']").click()
      cy.get('[data-test-id=display] p:last-child').should('have.text', '(-2)')
    })

    it('Negative input multiple numbers', () => {
      cy.clickMultipleTimes(3, "[data-test-id='button-3']")
      cy.get('[data-test-id=display] p:last-child').should('have.text', '(-333)')
    })

    it('Negative input multiple numbers with operands', () => {
      cy.clickMultipleTimes(3, "[data-test-id='button-3']")
      cy.get("[data-test-id='button--']").click()
      cy.clickMultipleTimes(2, "[data-test-id='button-2']")
      cy.get('[data-test-id=display] p:last-child').should('have.text', '(-22)')
      cy.get('[data-test-id=display] p:first-child').should('have.text', '(-333) -')
    })
  })
})