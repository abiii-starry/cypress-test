describe("Reward Module Test", () => {
    const NETWORK_GOERLI = Cypress.env("NETWORK_GOERLI")
    const SECRET_WORDS = Cypress.env("SECRET_WORDS")
    const PASSWORD = Cypress.env("PASSWORD")
    const PRIVATE_KEY_BETA = Cypress.env("PRIVATE_KEY_BETA")
    const NO_DATA_ACCOUNT = "No_data_account"

    before(() => {
        cy.setupMetamask(SECRET_WORDS, NETWORK_GOERLI, PASSWORD)
        cy.importMetamaskAccount(PRIVATE_KEY_BETA)
        cy.createMetamaskAccount(NO_DATA_ACCOUNT)
    })

    beforeEach(() => {
        cy.visit("ethereum/reward")
        cy.changeMetamaskNetwork(NETWORK_GOERLI)
    })

    // Public
    it("No data account", () => {
        cy.switchMetamaskAccount(NO_DATA_ACCOUNT)
        cy.toConnect()
        cy.contains("No Data", { matchCase: false })
        cy.get("#myChart").should("not.exist")
        cy.get(".overflow-x-auto").find("[class*='text-right']").should("not.exist")
        cy.contains(" Download ").should("not.exist")
    })

    it("Switch account", () => {
        cy.switchMetamaskAccount("Account 1")
        cy.toConnect()
        
        // Check whether the data has changed after switching accounts
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
        cy.contains("Connect your wallet", { matchCase: false })
        cy.get("#myChart").should("not.exist")
        cy.get(".overflow-x-auto").should("not.exist")
        cy.get('.space-x-4 > .btn-primary').click()
        cy.contains('MetaMask', {includeShadowDom: true}).click()
    })

    // Canvas Test
    describe("Canvas", () => {
        it("Account with data", () => {
            cy.switchMetamaskAccount("Account 1")
            cy.toConnect()
            cy.get("#myChart").should("exist")
        })
    })

    // List Test
    describe("List pagination", () => {
        it("Flip page by next and prev button",() => {
            cy.switchMetamaskAccount("Account 1")
            cy.toConnect()

            // recursive page flip by the next and prev button
            const isActive = "Control-active"
            cy.get(".my-8 li svg").eq(2).as("nextBtn")
            cy.get(".my-8 li svg").eq(1).as("prevBtn")

            const goToNextPage = () => {
                cy.get("@nextBtn").invoke("attr", "class").then((btnClass) => {
                    if (btnClass.includes(isActive)) {
                        cy.get("@nextBtn").click().then(goToNextPage)
                    }
                    else {
                        cy.get("@nextBtn").should("not.have.class", isActive)
                    }
                })
            }

            const goToPrevPage = () => {
                cy.get("@prevBtn").invoke("attr", "class").then((btnClass) => {
                    cy.log(btnClass)
                    cy.log(btnClass.includes(isActive))
                    if (btnClass.includes(isActive)) {
                        cy.get("@prevBtn").click().then(goToPrevPage)
                    }
                    else {
                        cy.get("@prevBtn").should("not.have.class", isActive)
                    }
                })
            }

            goToNextPage()
            goToPrevPage()
        })

        it("Flip page by the last and the first button", () => {
            cy.toConnect()

            // Click the last button
            cy.get(".my-8 li svg").eq(3).click()

            cy.get(".my-8 li svg").eq(2).should("not.have.class", "Control-active")
            cy.get(".my-8 li[active-color='#2563EB']").last().children()
            .should("have.class", "text-indigo-400")
            .and("have.class", "font-bold")

            // Click the first button
            cy.get(".my-8 li svg").eq(0).click()

            cy.get(".my-8 li svg").eq(1).should("not.have.class", "Control-active")
            cy.get(".my-8 li[active-color='#2563EB']").first().children()
            .should("have.text", 1)
            .and("have.class", "text-indigo-400")
            .and("have.class", "font-bold")
        })
    })
    
})