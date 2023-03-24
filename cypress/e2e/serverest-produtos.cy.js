/// <reference types="cypress" />

describe('Produtos', () => {
    
    const serverestUrlLogin = 'https://serverest.dev/login/'
    const serverestUrlProduct = 'https://serverest.dev/produtos/'
    const serverestUrlUsers = 'https://serverest.dev/usuarios/'
    const createUser = {
        nome: 'Lucas QA',
        email: 'lucasqa@creathus.com.br',
        password: 'teste',
        administrador: 'true'
    }
    const product = {
        nome: 'Razer Viper Ultimate',
        preco: '500',
        descricao: 'Mouse',
        quantidade: 10
    }

    it('Deve cadastrar um produto novo com sucesso', () => {
        cy.createUserCommand(createUser)
        
        cy.serverestLogin(createUser, serverestUrlLogin)
        .then(() => {
            cy.get('@loginResponse')
            .its('body.authorization')
            .should('exist')
            .then((token) => {
        // Armazenando o token em uma variável
        const authToken = token;
        
        let productId
        
        cy.request({
            url: serverestUrlProduct,
            method: 'POST',
            headers: {
                'Authorization': authToken
            },
            body: product
        })
        .then((response) => {
            productId = response.body._id
            // Armazenando ID do produto em uma variável
            const url = serverestUrlProduct + productId
            cy.request('GET', url)
        })
        .then(response => {
            // Valida a criação do produto listando pelo ID armazenado
            expect(response.status).to.eq(200)
            expect(response.body.nome).to.include('Razer Viper Ultimate')
        })
        // Delete o produto para manter assertividade do teste e não sujar base de dados
        .then((response) => {
            productId = response.body._id
            const url = serverestUrlProduct + productId
            cy.request({ 
                method: 'DELETE', 
                url, 
                headers: {
                    'Authorization': authToken
                }
            })
        })
        .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.include('Registro excluído com sucesso')
        })
        })
    })
        // Delete do usuário criado para manter assertividade do teste e não sujar base de dados
        cy.serverestLogin(createUser, serverestUrlLogin)        
        cy.request({
            url: serverestUrlUsers,
            method: 'GET',
            qs: {email:createUser.email}
        })
        .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.quantidade).to.equal(1)
        })
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