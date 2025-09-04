describe('studio', () => {
  it('Exemplo do Cypress Studio', () => {
    cy.visit('https://example.cypress.io')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('h1').should('have.text', 'Kitchen Sink');        
    cy.get('h1').should('be.visible');
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Login invalido depois valido', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get('#email').type('papito@webdojo.com');
    cy.get('#password').type('Katana123{enter}');
    //cy.contains('title', 'Acesso negado!')
    //  .should('be.visible');
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
    
    cy.get('#password').clear();
    cy.get('#password').type('katana123');
    cy.contains('button', 'Entrar').click();
    cy.get('[data-cy="user-name"]').should('have.text', 'Fernando Papito');
    /* ==== End Cypress Studio ==== */
  });
})