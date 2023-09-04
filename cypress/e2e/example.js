const SECRET_WORDS = Cypress.env("SECRET_WORDS");
const NETWORK_NAME = Cypress.env("NEWWORK_NAME");
const PASSWORD = Cypress.env("PASSWORD");

describe("connect wallet spec", () => {
    before(() => {
      // Completing initialization operations such as importing accounts
      cy.setupMetamask(SECRET_WORDS, NETWORK_NAME, PASSWORD);
      cy.log('setup metamask successfully');
      cy.visit("/");
      cy.wait(3000);
    });

    it('test origin', () => {
      cy.log('the first test is successful!');
      cy.wait(3000);
    })
  
    it("should connect wallet with success", () => {
      cy.get("#connectButton").click();
      cy.acceptMetamaskAccess();
      cy.wait(10000)
      // Check if you are connected to the corresponding wallet
      cy.get("#accounts").should(
        "have.text",
        "0xc23ef62913047447865d403c8d0b1e3be8cde701"
      );
    });
  
    it("import private key and connect wallet using imported metamask account", () => {
      cy.disconnectMetamaskWalletFromAllDapps();
      cy.wait(10000)
      cy.importMetamaskAccount(
        "0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97"
      );
      cy.log("import pravite key successfully!");
      cy.get("#connectButton").click();
      cy.acceptMetamaskAccess();
      cy.log("connect successfully!");
      cy.wait(3000);
      cy.get("#accounts").should(
        "have.text",
        "0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f"
      );
      cy.wait(3000);
    });
  });
  