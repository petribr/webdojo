describe('Consulta de CEP', () => {  
  it('Exibe mensagem de erro quando backend retorna 500', () => { 
    cy.login()

    // Intercepta o endpoint que o frontend consome e força erro 500
    cy.intercept('GET', 'https://viacep.com.br/ws/*/json/', {
      statusCode: 400,
      body: { message: 'Erro interno do servidor' }
    }).as('getSubservico');

    // Navega até "Formulários" > "Consultoria"
    cy.goTo('Integração', 'Consulta de CEP');  
    

    // Preenche o nome
    cy.get('#cep').type('29065420');  
    cy.contains('button', 'Buscar').click();    
 
    // Aguarda a requisição interceptada
    //cy.wait('@getSubservico');
 
    // Valida que o frontend mostra a mensagem de erro
    cy.wait('@getSubservico').its('response.body').should('deep.equal', {
      message: 'Erro interno do servidor'
    });
  });

  it('Resposta do serviço totalmente mockada - 200 ok', () => { 
    cy.login()

    // Intercepta o endpoint que o frontend consome e força erro 500
    cy.intercept('GET', 'https://viacep.com.br/ws/*/json/', {
      statusCode: 200,
      body: {
              "cep": "29065-420",
              "logradouro": "Rua Genserico Encarnação",
              "complemento": "",
              "unidade": "",
              "bairro": "Mata da Praia",
              "localidade": "Colatina",
              "uf": "ES",
              "estado": "Espírito Santo",
              "regiao": "Sudeste",
              "ibge": "3205309",
              "gia": "",
              "ddd": "27",
              "siafi": "5705"
            }
    }).as('getSubservico');

    // Navega até "Formulários" > "Consultoria"
    cy.goTo('Integração', 'Consulta de CEP');  
    
    // Preenche o nome
    cy.get('#cep').type('29065420');  
    cy.contains('button', 'Buscar').click();    
 
    // Aguarda a requisição interceptada
    cy.wait('@getSubservico');

    cy.get('#city')
      .should('be.visible')
      .and('have.value', 'Colatina')

  });
});

