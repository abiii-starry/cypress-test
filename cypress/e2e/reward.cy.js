describe("Reward Module", () => {
    const NETWORK = Cypress.env("NETWORK_GOERLI")
    const SECRET_WORDS = Cypress.env("SECRET_WORDS")
    const PASSWORD = Cypress.env("PASSWORD")

    before(() => {
        cy.visit("ethereum/reward")
        cy.switchChain(NETWORK)
        cy.connectMetamask(SECRET_WORDS, NETWORK, PASSWORD)
    })

    // Public
    it.only("No data account", () => {
        cy.request({
            method: "GET",
            url: "api/v1/networks/eth/rewards/summary",
            qs: {
                network_type: "goerli",
                address: "0xf1db32fe9c7a3f94e03b70d896da8dadc103ed43"
            }
        }).then(rep => {
            cy.log(rep.body.total_earn)
        })
    })

    // Canvas Test
    describe.skip("Canvas", () => {

    })

    // List Test
    describe("List", () => {

    })

})