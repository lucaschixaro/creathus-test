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
// Cypress.Commands.add('login', (email, password) => { ... })
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

Cypress.Commands.add('createUserCommand', (createUser)=> {
    cy.request({
        url: 'https://serverest.dev/usuarios',
        method: 'POST',
        body: createUser
    })
})

// Criação de custom commands para Login
Cypress.Commands.add('serverestLogin', (createUser, serverestUrlLogin) =>{
    cy.request({
        method: 'POST',
        url: serverestUrlLogin,
        body: {email:createUser.email, password:createUser.password}
    }).then((response) => {
        cy.wrap(response).as('loginResponse');
    })
})