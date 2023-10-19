const { defineConfig } = require("cypress");
const synpressPlugins = require("@synthetixio/synpress/plugins");

module.exports = defineConfig({
  chromeWebSecurity: true,
  userAgent: "cypress",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      synpressPlugins(on, config);
    },
    env: {
      CYPRESS_REMOTE_DEBUGGING_PORT: 9222
    },
    testIsolation: true,
    baseUrl: "https://pre.stake.dxpool.in",
    supportFile: "cypress/support/e2e.js",
    specPattern: [
      "cypress/e2e/**/connect-init.cy.js",
      "cypress/e2e/**/*.cy.js"
    ]
  },
});
