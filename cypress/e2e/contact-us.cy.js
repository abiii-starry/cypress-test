describe("Test Contact Us Module", () => {
    const contactCase = require('../fixtures/contact-us.json')

    before(() => {
        cy.visit("/contact")
    })

    beforeEach(() => {
        cy.get("select").as("selector")
        cy.get("input").eq(0).as("nameInput")
        cy.get("input").eq(1).as("emailInput")
        cy.get("textarea").as("message")
        cy.fixture("contact-us.json").as("contactData")
        cy.contains("Submit").as("submitBtn")
    })

    it("Select the type of message", () => {
        cy.get("@contactData").then(contactData => {
            for (let type of contactData.msgType) {
                cy.get("@selector").select(type)
                cy.get("@selector").should("not.be.disabled")
            }
        })
    })


    describe.only("Name Input Test", () => {
        // Positive Test
        const positiveCase = contactCase.name.positiveTest
        const trueExample = contactCase.trueExample               
        
        before(() => {
            cy.get("@emailInput").type(trueExample.email)
            cy.get("@message").type(trueExample.message)
        })

        afterEach(() => {
            cy.get("@nameInput").clear()
            cy.get("@message").clear()
        })

        positiveCase.forEach(testCase => {
            it(`Positive Test: ${testCase.desc}`, () => {
                cy.get("@nameInput").type(testCase.name)
                cy.get("@submitBtn").should("not.be.disabled")

            })
        })

    })


})