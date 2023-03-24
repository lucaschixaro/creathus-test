/// <reference types="cypress" />

// TODO: Trocar selector pelo ID das classes para melhorar funcionamento e assertividade do teste //

describe('Deve encontrar o endereço do Instituto Creathus pelo CEP', () => {
  it('Pesquisar pelo CEP 69082-640 no site dos Correios', () => {
    const url = 'http://www.buscacep.correios.com.br'
    const creathusCep = '69082-640'

    cy.visit(url)
  

    // Digitar em um elemento do tipo input
    cy.get('input[name="endereco"]')
      .type(creathusCep)

    // Validações das labels da lista suspensa do tipo do CEP
    cy.get('option[value="LOG"]')
      .should('have.text', 'Localidade/Logradouro')
      .should('be.visible')

    cy.get('option[value="PRO"]')
      .should('have.text', 'CEP Promocional')
      .should('be.visible')

    cy.get('option[value="CPC"]')
      .should('have.text', 'Caixa Postal Comunitária')
      .should('be.visible')

    cy.get('option[value="GRU"]')
      .should('have.text', 'Grande Usuário')
      .should('be.visible')

    cy.get('option[value="UOP"]')
      .should('have.text', 'Unidade Operacional')
      .should('be.visible')

    cy.get('option[value="ALL"]')
      .should('have.text', 'Todos')
      .should('be.visible')

    // Clique no botão pesquisar
    cy.get('button[name="btn_pesquisar"]')
      .click()

    // Assert dos dados pesquisados pelo CEP
    cy.get('tbody > tr > [data-th="Logradouro/Nome"]')
      .should('contain', 'Rua Doutor Elviro Dantas')
      .should('be.visible')

    cy.get('tbody > tr > [data-th="Bairro/Distrito"]')
      .should('contain', 'Coroado')
      .should('be.visible')

    cy.get('tbody > tr > [data-th="Localidade/UF"]')
      .should('contain', 'Manaus/AM')
      .should('be.visible')

    cy.get('tbody > tr > [data-th="CEP"]')
      .should('contain', creathusCep)
      .should('be.visible')
  })
})
