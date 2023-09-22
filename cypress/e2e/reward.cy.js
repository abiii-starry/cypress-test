describe("Reward Module", () => {
    const NETWORK = Cypress.env("NETWORK_GOERLI")
    const SECRET_WORDS = Cypress.env("SECRET_WORDS")
    const PASSWORD = Cypress.env("PASSWORD")
    const ADDRESS = Cypress.env("ACCOUNT_ADDRESS")
    const EMPTY_ADDRESS = "0x7f0532786c3ec337e42272ab035219f8cbda676f"

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
                network_type: NETWORK,
                address: EMPTY_ADDRESS
            }
        }).then(rep => {
            cy.log(rep.body.total_earn)
            if (! rep.body.total_earn) {
                cy.contains("No Data")
            }
            else {
                // pass: data is obtained
            }
        })
    })

    // Canvas Test
    describe.skip("Canvas", () => {

    })

    // List Test
    describe("List", () => {

    })

})