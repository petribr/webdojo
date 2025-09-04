describe('Kanban board', ()=> {
    it('Deve mover uma tarefa de TODO para one e atualizar o board', ()=> {
        cy.login()
        cy.contains('Kanban').click()

        const dataTransfer = new DataTransfer()

        cy.contains('div[draggable=true]', 'Documentar API')
          .trigger('dragstart', {dataTransfer})

        cy.get('.column-done')
          .trigger('drop', {dataTransfer})

        cy.contains('div[draggable=true]', 'Criar testes E2E')
          .trigger('dragstart', {dataTransfer})

        cy.get('.column-done')
          .trigger('drop', {dataTransfer})

        cy.contains('div[draggable=true]', 'Configurar CI/CD')
          .trigger('dragstart', {dataTransfer})

        cy.get('.column-done')
          .trigger('drop', {dataTransfer})
          .find('h3')
          .should('have.text', 'Done (6)')
        
        cy.get('.column-done')        
          .should('include.text', 'Documentar API')
          .and('include.text', 'Criar testes E2E')
          .and('include.text', 'Configurar CI/CD')
    })
})
    