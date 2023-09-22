// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Check if the connection has been successfully made: Local storage gets the address
Cypress.Commands.add("isConnect", () => {
    const local = Cypress.config("baseUrl");
    const successKey = "user";
    cy.getAllLocalStorage().then(localStorage => {
        let userJson = JSON.parse(localStorage[local])
        let connectStatus = userJson[successKey]["isConnect"]
        cy.log(`Connect Status: ${connectStatus}`)
        cy.wrap(connectStatus).as("connectStatus")
    })
})


// Switch chain in staking web
Cypress.Commands.add("switchChain", (chain) => {
    cy.get("#headlessui-listbox-button-1").click();
    cy.get("#headlessui-listbox-options-2").contains(chain, { matchCase: false }).click();
})


// Connect via Metamask
Cypress.Commands.add("connectMetamask", (secret_words, network,password) => {
    cy.setupMetamask(secret_words, network, password)

    cy.get('.space-x-4 > .btn-primary').click()
    cy.contains('MetaMask', {includeShadowDom: true}).click()
    cy.acceptMetamaskAccess()
})