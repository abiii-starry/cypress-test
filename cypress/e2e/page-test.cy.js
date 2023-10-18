describe("Test page and api", () => {
    beforeEach(() => {
        // cy.visit("/ethereum/reward")
        // cy.pause()
    })

    it("Compare interface data with each page", () => {
        cy.visit("/ethereum/reward")
        
        cy.toConnect()

        const isActive = "Control-active"
        cy.get(".my-8 li svg").eq(2).as("nextBtn")


        const goToNextPage = () => {
            cy.log("start")
            cy.get("@nextBtn").invoke("attr", "class")
            
            .then((btnClass) => {
                if (btnClass.includes(isActive)) {
                    cy.get("@nextBtn").click().then(goToNextPage)
                    cy.intercept("/api/v1/networks/eth/rewards/list?*").as("rsp")
                    cy.wait("@rsp").then(rsp => {
                        cy.log(rsp)
                    })
                }
                else {
                    // cy.get("@nextBtn").should("not.have.class", isActive)
                    cy.log("====end====")
                }
            })
        }
        cy.log(123)
    
    goToNextPage()
})

})