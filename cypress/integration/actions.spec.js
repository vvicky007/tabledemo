/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3006/')
  })

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {

    cy.get('tr > :nth-child(1) > input').type('RPaBw')
    cy.get('tr > :nth-child(1) > input').should('have.value','RPaBw')
    cy.get('tbody > tr > :nth-child(1)').contains('td','RPaBw')
    // https://on.cypress.io/type
    // cy.get('.action-email')
    //   .type('fake@email.com').should('have.value', 'fake@email.com')

    //   // .type() with special character sequences
    //   .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
    //   .type('{del}{selectall}{backspace}')

    //   // .type() with key modifiers
    //   .type('{alt}{option}') //these are equivalent
    //   .type('{ctrl}{control}') //these are equivalent
    //   .type('{meta}{command}{cmd}') //these are equivalent
    //   .type('{shift}')

    //   // Delay each keypress by 0.1 sec
    //   .type('slow.typing@email.com', { delay: 100 })
    //   .should('have.value', 'slow.typing@email.com')

  
  })

})
