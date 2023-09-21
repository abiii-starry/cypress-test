const { defineConfig } = require("cypress");
const synpressPlugins = require("@synthetixio/synpress/plugins");

module.exports = defineConfig({
  userAgent: "synpress",
  chromeWebSecurity: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      synpressPlugins(on, config);
    },
    testIsolation: false,
    baseUrl: "https://stake.dxpool.com",
    supportFile: "cypress/support/e2e.js"
  },
});
