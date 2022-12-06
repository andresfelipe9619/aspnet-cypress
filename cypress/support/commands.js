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
Cypress.Commands.add('login', (username, password) => {
  cy.get('#ctl00_ContentPlaceHolder1_txt_Usuario').type(username)
  cy.get('#ctl00_ContentPlaceHolder1_txt_Password').type(password)
  cy.get('#ctl00_ContentPlaceHolder1_btn_Aceptar').click()
  cy.wait(2500)
})

Cypress.Commands.add('selectClient', (id, description) => {
  cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Identificador')
    .type(id)
    .blur()
  cy.get('@open').should('have.been.calledOnce')
  cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Descripcion')
    .focus()
    .type(description)
  cy.get(
    '#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_AutoCompleteExtender1_completionListElem > li'
  )
    .first()
    .click()
  cy.wait(2000)
})

Cypress.Commands.add('selectSubject', (subject, autoselect = true) => {
  cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_txt_Identificador')
    .type(subject.id)
    .blur()
  cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_txt_Descripcion')
    .focus()
    .wait(500)
    .type(subject.descripcion)
  if (autoselect) {
    cy.get(
      '#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_AutoCompleteExtender1_completionListElem > li'
    )
      .first()
      .click()
    cy.wait(2000)
  }
})

Cypress.Commands.add('selectTime', (time, description) => {
  cy.get('#ctl00_ContentPlaceHolder1_Tiempo_DEC').type(time).blur()
  cy.get('#ctl00_ContentPlaceHolder1_txt_Descripcion').type(description).blur()
  cy.wait(2500)
})
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
