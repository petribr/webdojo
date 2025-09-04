const { defineConfig } = require("cypress");
const fs = require('fs')
const path = require('path')

const {readPdf} = require('./cypress/support/helper')

module.exports = {
  e2e: {
     setupNodeEvents(on, config) {
      on('task', {
        savePdf({ buffer, fileName }) {
          const dir = path.join(__dirname, '..', 'downloads')
          const filePath = path.join(dir, fileName)

          // garante que a pasta existe
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
          }

          // salva o buffer
          fs.writeFileSync(filePath, Buffer.from(buffer))
          return filePath
        }
      }),
      on ('task', {
        readPdf
      })
    },
    experimentalStudio: true,
    video: false
    // this is not a good aproach, but can be helpful in some context
    // global timeout
    //,defaultCommandTimeout: 10000
  }
}


