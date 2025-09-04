describe('template spec', () => {
  it('Login', () => {
    // cy.viewport('iphone-x')
    //cy.viewport(1920, 1080)
    cy.viewport(1440, 900)
    cy.visit('http://localhost:3000')
    cy.get('#email').type('papito@webdojo.com')
    cy.get('#password').type('katana123')
    cy.contains('button', 'Entrar').click()
    cy.wait(3000)

    cy.get('[data-cy="user-name"]')
      .should('be.visible').and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible').and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })

  it('Não deve logar com senha inválida', () => {
    cy.viewport(1440, 900)
    cy.visit('http://localhost:3000')
    cy.get('#email').type('papito@webdojo.com')
    cy.get('#password').type('katana321')
    cy.contains('button', 'Entrar').click()    

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  //it.only('Não deve logar com email não cadastrado', () => {
  it('Não deve logar com email não cadastrado', () => {
    cy.viewport(1440, 900)
    cy.visit('http://localhost:3000')
    cy.get('#email').type('pipato@webdojo.com')
    cy.get('#password').type('katana321')
    cy.contains('button', 'Entrar').click()    

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})

//describe agrupa testes
// it caso de teste
/*describe('Login', ()=>{
  it('Deve logar com sucesso', ()=> {
    cy.viewport(1440,900)
    cy.visit('http://localhost:3000')
  })
})*/