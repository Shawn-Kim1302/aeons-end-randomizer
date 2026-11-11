import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    // The dev server serves the app under the "homepage" path from package.json
    baseUrl: 'http://localhost:3000/aeons-end-randomizer/',
  },
})
