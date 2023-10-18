describe("Reward Module Test", () => {
    const NETWORK = Cypress.env("NETWORK_GOERLI")
    const SECRET_WORDS = Cypress.env("SECRET_WORDS")
    const PASSWORD = Cypress.env("PASSWORD")
    const PRIVATE_KEY_BETA = Cypress.env("PRIVATE_KEY_BETA")
    const NO_DATA_ACCOUNT = "No_data_account"

    before(() => {
        cy.visit("ethereum/reward")

        cy.switchChain(NETWORK)
        cy.setupMetamask(SECRET_WORDS, NETWORK, PASSWORD)
        cy.importMetamaskAccount(PRIVATE_KEY_BETA)
        cy.createMetamaskAccount(NO_DATA_ACCOUNT);

        cy.get('.space-x-4 > .btn-primary').click()
        cy.contains('MetaMask', {includeShadowDom: true}).click()
        cy.acceptMetamaskAccess({ allAccounts: true })
        cy.wait(2000)
    })

    // Public
    it.skip("No data account", () => {
        cy.switchMetamaskAccount(NO_DATA_ACCOUNT)
        cy.contains("No Data", { matchCase: false })
        cy.get("#myChart").should("not.exist")
        cy.get(".overflow-x-auto").find("[class*='text-right']").should("not.exist")
        cy.contains(" Download ").should("not.exist")
        cy.wait(2000)
    })

    it.skip("Switch account", () => {
        cy.wait(3000)
        cy.switchMetamaskAccount("Account 1")
        cy.get(".overflow-x-auto").find(".text-center").eq(1)
        .then($firstReward => {
            const firstReward = $firstReward.text()

            cy.switchMetamaskAccount("Account 2")
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
        cy.connectMetamask()
    })

    // Canvas Test
    describe.skip("Canvas", () => {
        it("Account with data", () => {
            cy.switchMetamaskAccount("Account 1")
            cy.get("#myChart").should("exist")
        })
    })

    // List Test
    describe("List pagination", () => {
        it("flip the list", () => {
            cy.switchMetamaskAccount("Account 1")
            
            // Recursion flip page
            const clickNextPage = () => {
                cy.get("li").last().prev().then($nextBtn => {
                if ($nextBtn.hasClass("Control-active")) {
                    cy.wait(1000)
                    cy.get("li").last().prev().click()
                    clickNextPage()
                }
                else {
                    return
                }
                })
            }
            clickNextPage()
            
        })
    })
})