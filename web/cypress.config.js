const { defineConfig } = require("cypress");
const fs = require('fs')
const path = require('path')

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
      })
    }
    //,defaultCommandTimeout: 10000
  }
}


