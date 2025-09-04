describe('Download PDF from public URL and save to disk', () => {
  it('GET binary PDF and save as file', () => {
    cy.request({
      method: 'GET',
      url: 'https://www.orimi.com/pdf-test.pdf',
      encoding: 'binary'
    }).then((response) => {
      expect(response.status).to.eq(200)

      const pdfBuffer = Buffer.from(response.body, 'binary')

      // envia o buffer (não um objeto inteiro como "data")
      cy.task('savePdf', { buffer: pdfBuffer, fileName: 'sample-test.pdf' })
        .then((filePath) => {
          cy.log(`PDF salvo em: ${filePath}`)
        })
    })
  })

  it('Reading PDF', () => {
    cy.task('readPdf', 'cypress/fixtures/recibo.pdf')
      .should('contain', 'Papito Shop')
      .and('contain', 'Total24.000')
  })
})