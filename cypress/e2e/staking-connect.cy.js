const SECRET_WORDS = Cypress.env("SECRET_WORDS");
const NETWORK_GOERLI = Cypress.env("NETWORK_GOERLI");
const PASSWORD = Cypress.env("PASSWORD");
const NETWORK_MAINNET = Cypress.env("NETWORK_MAINNET");

describe("Test connect staking web", () => {
    before(() => {
        // cy.setupMetamask(SECRET_WORDS, NETWORK_GOERLI, PASSWORD);
        cy.visit('/ethereum/staking?step=1');
        cy.switchChain(NETWORK_GOERLI);
        cy.contains('Connect')
        .click();
        cy.contains('MetaMask', {includeShadowDom: true})
        .click();
        cy.acceptMetamaskAccess();
        // cy.isConnect();
    })

    it("Switch to mainnet in web", () => {
        cy.log(NETWORK_MAINNET);
        cy.wait(3000);
        cy.switchChain(NETWORK_MAINNET);
        cy.allowMetamaskToSwitchNetwork();
        cy.wait(3000);
        cy.log("change to mainnet network succussfully!");
        cy.get("#headlessui-listbox-button-1")
        .should("have.text", NETWORK_MAINNET.toUpperCase());
        cy.wait(3000);
    })

    it("Switch to mainnet in Metamask", () => {
        cy.changeMetamaskNetwork(NETWORK_MAINNET);
        cy.get("#headlessui-listbox-button-1")
        .should("have.text", NETWORK_MAINNET.toUpperCase());
    })

    it("Switch to an unsupported chain in Metamask", () => {
        cy.addMetamaskNetwork({
            networkName: "Optimism Network",
            rpcUrl: "https://mainnet.optimism.io",
            chainId: "10",
            symbol: "OETH",
            blockExplorer: "https://optimistic.etherscan.io",
            isTestnet: false,
          });
        cy.log("ADD SUCCESSFUL");
        cy.contains("Switch Network");
    })

})