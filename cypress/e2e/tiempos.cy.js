const domain = 'creel-preproduccion.geniusqa.com.mx'
const baseUrl = `https://${domain}/GeniusLegal`
const popUrl =
  baseUrl +
  '/WebControls/GS_FiltroBusqueda_Tabla.aspx?TipoCatalogo=2&paramIdentificador=389&paramDescripcion=&paramObjetoID=ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_CveClienteSelec&ParaCapturaTiempo=false&VistaCapturaTiempo=false&paramCveEmpleado_Logeado=198&paramCveEmpresa=-1&FechaEfectiva=&ArrayCveEstatusCliente=1,6&%20ObtenPrimerRegistroControl=1&paramMuestraEstatus=0&paramEsClienteAlterno=False'

describe('Test Time Slots', () => {
  it('Should create a time slot successfully', () => {
    cy.visit(baseUrl + '/Default.aspx')
    const stub = cy.stub().as('open')
    cy.on('window:before:load', win => {
      cy.stub(win, 'open').callsFake(stub)
    })

    // Login usuario
    cy.get('#ctl00_ContentPlaceHolder1_txt_Usuario').type('aruiz')
    cy.get('#ctl00_ContentPlaceHolder1_txt_Password').type('g$2020*')
    cy.get('#ctl00_ContentPlaceHolder1_btn_Aceptar').click()
    cy.wait(2500)

    // cy.on('uncaught:exception', (err, runnable) => {
    //   return false
    // })
    // cy.get('td')
    //   .contains('130 - Vacaciones')
    //   .should('not.exist')

    // Seleccionar Cliente
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Identificador')
      .type('00001')
      .blur()
    cy.get('@open').should('have.been.calledOnce')
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Descripcion')
      .focus()
      .type('CREEL')
    cy.get(
      '#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_AutoCompleteExtender1_completionListElem > li'
    )
      .first()
      .click()
    cy.wait(2000)
    // Seleccionar Asunto
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_txt_Identificador')
      .type('130')
      .blur()
    // cy.get('@open').should('have.been.calledOnce')
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_txt_Descripcion')
      .focus()
      .wait(500)
      .type('vaca')
    cy.get(
      '#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_AutoCompleteExtender1_completionListElem > li'
    )
      .first()
      .click()
    cy.wait(2000)

    cy.get('#ctl00_ContentPlaceHolder1_Tiempo_DEC')
      .type('.25')
      .blur()
    cy.get('#ctl00_ContentPlaceHolder1_txt_Descripcion')
      .type('Esto es un texto de prueba!👽')
      .blur()
    cy.get('#ctl00_ContentPlaceHolder1_btn_Agregar').click()
    cy.wait(2000)
    cy.get('td', { timeout: 10000 })
      .contains('130 - Vacaciones')
      .should('exist')

    // cy.get('#ctl00_ContentPlaceHolder1_btn_borreg').click()
  })

  it('Should not fail reading vacation', () => {
    cy.visit(baseUrl + '/Default.aspx')
    const stub = cy.stub().as('open')
    cy.on('window:before:load', win => {
      cy.stub(win, 'open').callsFake(stub)
    })

    // Login usuario
    cy.get('#ctl00_ContentPlaceHolder1_txt_Usuario').type('aruiz')
    cy.get('#ctl00_ContentPlaceHolder1_txt_Password').type('g$2020*')
    cy.get('#ctl00_ContentPlaceHolder1_btn_Aceptar').click()
    cy.wait(2500)

    // cy.on('uncaught:exception', (err, runnable) => {
    //   return false
    // })
    cy.get('td')
      .contains('130 - Vacaciones')
      .should('not.exist')

    // cy.get('#ctl00_ContentPlaceHolder1_btn_borreg').click()
  })
})
