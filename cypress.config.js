const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'obriwp',
  chromeWebSecurity: false,
  video: false,
  retries: 1,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents (on, config) {
      // include any other plugin code...
      require('cypress-mochawesome-reporter/plugin')(on)
      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    }
  }
})
