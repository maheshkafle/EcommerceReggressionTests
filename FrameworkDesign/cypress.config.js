const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env:{
      url: 'https://rahulshettyacademy.com/'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    watchForFileChanges: false,
    viewportWidth:1440,
    viewportHeight:900
  },
});
