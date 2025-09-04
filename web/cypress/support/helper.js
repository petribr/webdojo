const readPdf = (pdfPath) => {
    const pdf = require('pdf-parse')
    const path = require('path')
    const fs = require('fs')

    return new Promise((resolve) => {
      //obter caminho absoluto
      const pdfAbsPath = path.resolve(pdfPath)
      //ler conteúdo do arquivo no caminho absoluto
      const pdfData = fs.readFileSync(pdfAbsPath)
      pdf(pdfData)
        .then(function({text}){
            resolve(text) 
        })        
    })
}

module.exports = {readPdf}