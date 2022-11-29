const domain = 'creel-preproduccion.geniusqa.com.mx'
const baseUrl = `https://${domain}/GeniusLegal`
const popUrl =
  baseUrl +
  '/WebControls/GS_FiltroBusqueda_Tabla.aspx?TipoCatalogo=2&paramIdentificador=389&paramDescripcion=&paramObjetoID=ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_CveClienteSelec&ParaCapturaTiempo=false&VistaCapturaTiempo=false&paramCveEmpleado_Logeado=198&paramCveEmpresa=-1&FechaEfectiva=&ArrayCveEstatusCliente=1,6&%20ObtenPrimerRegistroControl=1&paramMuestraEstatus=0&paramEsClienteAlterno=False'

describe('Login into page', () => {
  it('Should fail with wrong credentials', () => {
    cy.visit(baseUrl + '/Default.aspx')
    const stub = cy.stub().as('open')
    cy.on('window:before:load', win => {
      cy.stub(win, 'open').callsFake(stub)
    })

    cy.get('#ctl00_ContentPlaceHolder1_txt_Usuario').type('ASCOL')
    cy.get('#ctl00_ContentPlaceHolder1_txt_Password').type(`ASCOL!"#$@`)
    cy.get('#ctl00_ContentPlaceHolder1_btn_Aceptar').click()
    cy.wait(2000)
  })
})
