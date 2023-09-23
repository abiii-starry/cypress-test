describe("Reward Module", () => {
    const NETWORK = Cypress.env("NETWORK_GOERLI")
    const SECRET_WORDS = Cypress.env("SECRET_WORDS")
    const PASSWORD = Cypress.env("PASSWORD")
    const ADDRESS = Cypress.env("ACCOUNT_ADDRESS")
    // const EMPTY_ADDRESS = "0x7f0532786c3ec337e42272ab035219f8cbda676f"
    const IMPORT_PRIVATE_KEY = Cypress.env("IMPORT_PRIVATE_KEY")

    before(() => {
        cy.visit("ethereum/reward")

        cy.switchChain(NETWORK)
        cy.setupMetamask(SECRET_WORDS, NETWORK, PASSWORD)
        cy.importMetamaskAccount(IMPORT_PRIVATE_KEY)

        cy.get('.space-x-4 > .btn-primary').click()
        cy.contains('MetaMask', {includeShadowDom: true}).click()
        cy.acceptMetamaskAccess({ allAccounts: true })
    })

    // Public: todo
    it("No data account", () => {
        cy.intercept("https://stake.dxpool.com/api/v1/networks/eth/rewards/list", req => {
            req.reply(response => {
                response.send({ fixture: "route/reward-empty.json" })
            })
        })
        cy.contains("No Data", { matchCase: false })
        cy.pause()
    })

    it("Switch account", () => {
        cy.get(".overflow-x-auto").find(".text-center").eq(1)
        .then($firstReward => {
            const firstReward = $firstReward.text()

            cy.switchMetamaskAccount("Account 1")
            cy.get(".overflow-x-auto").find(".text-center").eq(1)
            .should($secondReward => {
                expect($secondReward.text()).not.to.eq(firstReward)
            })
        })

    })

    it("Unconnected", () => {
        cy.disconnectWeb()
        cy.contains("Connect your wallet", { matchCase: false })
        cy.get("#myChart").should("not.exist")
        cy.get(".overflow-x-auto").should("not.exist")
    })

    // Canvas Test
    describe.skip("Canvas", () => {

    })

    // List Test
    describe("List", () => {

    })

})