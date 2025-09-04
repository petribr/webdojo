describe('Tocar o video', ()=> {
    it('Deve poder tocar o video de exemplo', ()=> {
        cy.login()
        cy.contains('Video').click()
        
        //estão dentro de um iframe (elemento que abre uma página dentro da outra)
        //its() -> função usada para obter elementos do html
        cy.get('iframe[title="Video Player"]')
          .should('exist')
          .its('0.contentDocument.body')
          .then(cy.wrap) //pegar o valor de um objeto ou array (objeto cypress)
          .as('iFramePlayer')
          
        cy.get('@iFramePlayer')
          .find('.play-button')
          .click()

        cy.get('@iFramePlayer')
          .find('.pause-button')
          .should('be.visible')
    })
})