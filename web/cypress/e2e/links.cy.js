describe('Links abrindo nova guia/janela', ()=> {
    it.skip('Valindando o atributo do link do Instagram', ()=> {
        cy.login()

        cy.get('[data-cy="instagram-link"]')
          .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
          .and('have.attr', 'target', '_blank')
    }),

    it('Acessa link de termos de uso', ()=> {
        cy.login()

        // Navega até "Formulários" > "Consultoria"
        cy.goTo('Formulários', 'Consultoria');  

        // remove o atributo target para poder interagir com a página sem mudar de aba/janela
        cy.contains('a', 'termos de uso')
          .invoke('removeAttr', 'target')
          .click()

        cy.contains('Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.')
          .should('be.visible')

    })
})