describe('Formulário de Consultoria', () => {  

  beforeEach(()=> {
    cy.login()
    // Navega até "Formulários" > "Consultoria"
    cy.goTo('Formulários', 'Consultoria')
  })

  it('Deve solicitar consultoria individual', () => {      
    // Preenche o nome
    cy.get('#name').type('Romulo Petri');  
    
    // Preenche o email
    cy.get('#email').type('petribr.tester@gmail.com');  
    
    // Preenche telefone e valida formatação
    cy.get('#phone')
      .type('72936817676')
      .should('have.value', '(72) 93681-7676');  

    // Seleciona "In Company" no campo Tipo de Consultoria
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select('In Company');  
    
    // Marca Pessoa Física
    cy.contains('span', 'Pessoa Física')
      .parent()
      .find('input')
      .check();  

    // Garante que Pessoa Jurídica não está marcada
    cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .should('be.not.checked');  

    // Preenche CPF
    //cy.get('#document').type('403.915.610-22');
    cy.contains('label','CPF')
      .parent()
      .find('input') 
      .type('40391561022')
      .should('have.value', '403.915.610-22')
    //cy.get('input[placeholder="000.000.000-00"]')
    //  .type('40391561022')
    //  .should('have.value', '403.915.610-22')

    const redesSociais = ['Instagram', 'YouTube', 'LinkedIn', 'Udemy'];

    // Marca cada rede social
    redesSociais.forEach((rede) => {
      cy.contains('label', rede)
        .find('input')
        .check();
    });

    // Faz upload do arquivo teste.txt
    cy.get('input[type="file"]').attachFile('application.pdf', { force: true });  

    cy.get('#details').
      type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

    // Lista de tecnologias
    const tecnologias = ['dot.net', 'java', 'c++']

    // Digita cada tecnologia e pressiona Enter
    tecnologias.forEach(tec => {
      cy.get('#technologies').type(`${tec}{enter}`);
    })

    // Verifica se cada tecnologia está presente nos spans criados
    tecnologias.forEach(tec => {
      cy.contains('label', 'Tecnologias')
        .parent()
        .contains('span', tec)
        .should('be.visible');
    })

    cy.contains('label', 'termos de uso')
      .find('input[type="checkbox"]')
      .check({ force: true })

    cy.contains('button', 'Enviar formulário').click()   

    // Verifica a mensagem no modal de sucesso 
    cy.get('.modal', {timeout: 7000})
      .should('be.visible')
      .find('.modal-content')
      .should('be.visible')
      .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
  });

  it('Deve verificar os campos obrigatórios', () => {
    cy.contains('button', 'Enviar formulário').click();

    cy.contains('p', 'Campo obrigatório')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

      // precisa ser ajustado
    cy.contains('p', 'Campo obrigatório')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

       cy.contains('p', 'Você precisa aceitar os termos de uso')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

  })
});

