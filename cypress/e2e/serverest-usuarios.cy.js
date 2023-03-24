/// <reference types="cypress" />

describe('Usuario', () => {
    it('Deve criar um usuário', () =>{
        
        const serverestUrlUsers = 'https://serverest.dev/usuarios/'
        const createUser = {
            nome: 'Lucas QA',
            email: 'lucas@creathus.com.br',
            password: 'teste',
            administrador: 'true'
        }

        cy.createUserCommand(createUser)
        .then(response => {
            expect(response.status).to.eq(201)
        })
        cy.request({
            url: serverestUrlUsers,
            method: 'GET',
            qs: {email:createUser.email}
        })
        .then(response => {
            expect(response.status).to.eq(200)
        // Validação a criação do usuários listando ele pelo nome
            expect(response.body.quantidade).to.equal(1)
        })
        // Delete do usuário para manter assertividade do teste e não sujar base de dados
        .its('body.usuarios[0]._id')
        .then((id) => {
            const url = serverestUrlUsers + id
            cy.request('DELETE', url)
        })
        .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.include('Registro excluído com sucesso')
        })
    })
})