describe("Test Contact Us Module", () => {
    before(() => {
        cy.visit("/contact")
    })

    beforeEach(() => {
        cy.get('select').as('selector')
        cy.get('input').eq(0).as('nameInput')
        cy.get('input').eq(1).as('emailInput')
        cy.get('textarea').as('message')
        cy.contains('Submit').as('submitBtn')
    })

    it("Select the type of message", () => {
        cy.fixture("contact-us.json").then(contactFixture => {
            for (let type of contactFixture.msgType) {
                cy.get("@selector").select(type)
                cy.get("@selector").should("not.be.disabled")
            }
        })
    })
})