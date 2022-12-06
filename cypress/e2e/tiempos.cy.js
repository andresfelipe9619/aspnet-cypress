const domain = 'creel-preproduccion.geniusqa.com.mx'
const baseUrl = `https://${domain}/GeniusLegal`
const popUrl =
  baseUrl +
  '/WebControls/GS_FiltroBusqueda_Tabla.aspx?TipoCatalogo=2&paramIdentificador=389&paramDescripcion=&paramObjetoID=ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_CveClienteSelec&ParaCapturaTiempo=false&VistaCapturaTiempo=false&paramCveEmpleado_Logeado=198&paramCveEmpresa=-1&FechaEfectiva=&ArrayCveEstatusCliente=1,6&%20ObtenPrimerRegistroControl=1&paramMuestraEstatus=0&paramEsClienteAlterno=False'

describe('Gestion de Tiempos', () => {
  beforeEach(() => {
    const stub = cy.stub().as('open')
    cy.on('window:before:load', win => {
      cy.stub(win, 'open').callsFake(stub)
    })
    cy.fixture('users/admin.json').as('adminUser')
    cy.fixture('clients/staging.json').as('client')
  })

  it.skip('Deberia crear un tiempo exitosamente', function () {
    cy.visit(baseUrl + '/Default.aspx')

    // Iniciar Sesion
    const { username, password } = this.adminUser
    cy.login(username, password)

    // Seleccionar Cliente
    const { id, descripcion } = this.client.creel
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Identificador')
      .type(id)
      .blur()
    cy.get('@open').should('have.been.calledOnce')
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Descripcion')
      .focus()
      .type(descripcion)
    cy.get(
      '#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_AutoCompleteExtender1_completionListElem > li'
    )
      .first()
      .click()
    cy.wait(2000)

    // Seleccionar Asunto
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_txt_Identificador')
      .type('139')
      .blur()
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_txt_Descripcion')
      .focus()
      .wait(500)
      .type('Entrevistas y Proceso de Contratación')
    cy.get(
      '#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_AutoCompleteExtender1_completionListElem > li'
    )
      .first()
      .click()
    cy.wait(2000)

    // Selecciona tiempo y descripcion
    cy.get('#ctl00_ContentPlaceHolder1_Tiempo_DEC').type('1.25').blur()
    cy.get('#ctl00_ContentPlaceHolder1_txt_Descripcion').type('Tiempo 1').blur()

    // Crea tiempo
    cy.get('#ctl00_ContentPlaceHolder1_btn_Agregar').click()
    cy.wait(2000)
    cy.get('td', { timeout: 10000 })
      .contains('139 - Entrevistas y Proceso de Contratación')
      .should('exist')
  })

  it.skip('Debería crear un tiempo con LEDES exitosamente', function () {
    cy.visit(baseUrl + '/Default.aspx')

    // Iniciar Sesion
    const { username, password } = this.adminUser
    cy.login(username, password)

    // Seleccionar Cliente
    const { id, descripcion, asunto, LEDES } = this.client.creek
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Identificador')
      .type(id)
      .blur()
    cy.get('@open').should('have.been.calledOnce')
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Descripcion')
      .focus()
      .type(descripcion)
    cy.get(
      '#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_AutoCompleteExtender1_completionListElem > li'
    )
      .first()
      .click()
    cy.wait(2000)

    // Seleccionar Asunto
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_txt_Identificador')
      .type(asunto.id)
      .blur()
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_txt_Descripcion')
      .focus()
      .wait(500)
      .type(asunto.descripcion)
    cy.get(
      '#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_AutoCompleteExtender1_completionListElem > li'
    )
      .first()
      .click()
    cy.wait(2000)

    // Selecciona tiempo y descripcion
    cy.get('#ctl00_ContentPlaceHolder1_Tiempo_DEC').type('1.25').blur()
    cy.get('#ctl00_ContentPlaceHolder1_txt_Descripcion').type('Tiempo 1').blur()

    // Crea tiempo
    cy.get('#ctl00_ContentPlaceHolder1_btn_Agregar').click()
    cy.wait(2000)
    cy.get('td', { timeout: 10000 })
      .contains('139 - Entrevistas y Proceso de Contratación')
      .should('exist')
  })

  it('No Deberia crear un tiempo sin campos completos', function () {
    cy.visit(baseUrl + '/Default.aspx')

    // Iniciar Sesion
    const { username, password } = this.adminUser
    cy.login(username, password)

    // Seleccionar Cliente
    const { id, descripcion } = this.client.creel
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Identificador')
      .type(id)
      .blur()
    cy.get('@open').should('have.been.calledOnce')
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Descripcion')
      .focus()
      .type(descripcion)

    cy.get('#ctl00_ContentPlaceHolder1_Tiempo_DEC').type('1.25').blur()
    cy.get('#ctl00_ContentPlaceHolder1_txt_Descripcion').type('Tiempo 1').blur()
    cy.get('#ctl00_ContentPlaceHolder1_btn_Agregar').click()
    cy.get('#ctl00_ContentPlaceHolder1_lbl_Mensaje').should('be.visible')
  })

  it('No Deberia crear un tiempo con campos incorrectos', function () {
    cy.visit(baseUrl + '/Default.aspx')

    // Iniciar Sesion
    const { username, password } = this.adminUser
    cy.login(username, password)

    // Seleccionar Cliente
    const { id, descripcion } = this.client.creel
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Identificador')
      .type(id)
      .blur()
    cy.get('@open').should('have.been.calledOnce')
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_txt_Descripcion')
      .focus()
      .type(descripcion)
    cy.get(
      '#ctl00_ContentPlaceHolder1_GS_Filtro_Cliente_AutoCompleteExtender1_completionListElem > li'
    )
      .first()
      .click()
    cy.wait(2000)

    // Seleccionar Asunto
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_txt_Identificador')
      .type('7')
      .blur()
    cy.get('#ctl00_ContentPlaceHolder1_GS_Filtro_Asunto_txt_Descripcion')
      .focus()
      .wait(500)
      .type('Este asunto es incorrecto')

    cy.get('#ctl00_ContentPlaceHolder1_Tiempo_DEC').type('1.25').blur()
    cy.get('#ctl00_ContentPlaceHolder1_txt_Descripcion').type('Tiempo 1').blur()
    cy.get('#ctl00_ContentPlaceHolder1_btn_Agregar').click()
    cy.get('#ctl00_ContentPlaceHolder1_lbl_Mensaje').should('be.visible')
  })

  it('No Debería crear un tiempo si hay problemas ortográficos', function () {})

  it('No Debería liberar un tiempo si no hay tarifa (13:53)', function () {})

  it('No Debería poder editar un tiempo si ya fue liberado', function () {})

  it('Debería poder usar el cronometro y el rango de fechas correctamente (22:27)', function () {})

  it('Debería poder usar el glosario global correctamente', function () {})

  it('Debería poder usar mi glosario correctamente (29:00)', function () {})

  it('Debería poder bloquear el cliente y usuario correctamente (27:25)', function () {})

  it('Debería poder usar ultimas capturas generales correctamente', function () {})

  it('Debería poder usar ultimas capturas del cliente correctamente (31:47)', function () {})

  it('Debería poder usar el calendario correctamente (36:54)', function () {})

  it('Debra poder agregar palabras al diccionario correctamente (40:12)', function () {})

  it('Debería poder usar multi captura correctamente (43:09)', function () {})
})
