describe("Test Contact Us Module", () => {
    const contactCase = require("../fixtures/contact-us.json")

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


    describe("Name Input Test", () => {
        const positiveCase = contactCase.nameCase.positiveTest
        const negativeCase = contactCase.nameCase.negativeTest
        const trueExample = contactCase.trueExample               
        
        beforeEach(() => {
            cy.get("@emailInput").type(trueExample.email)
            cy.get("@message").type(trueExample.message)
        })

        afterEach(() => {
            cy.get("@nameInput").clear()
            cy.get("@emailInput").clear()
            cy.get("@message").clear()
        })

        // Positive Test
        positiveCase.forEach(testCase => {
            it(`Positive Test: ${testCase.desc}`, () => {
                cy.get("@nameInput").type(testCase.name)
                cy.get("@submitBtn").should("not.be.disabled")
            })
        })

        // Negative Test
        negativeCase.forEach(testCase => {
            it(`Negative Test: ${testCase.desc}`, () => {
                cy.get("@nameInput").type(testCase.name)
                cy.get("@submitBtn").should("be.disabled")
                if (testCase.assertion) {
                    cy.contains(testCase.assertion)
                }
            })
        })

        it("Empty Test", () => {
            cy.get("@submitBtn").should("be.disabled")
        })

    })


    describe("Email Input Test", () => {
        const positiveCase = contactCase.emailCase.positiveTest
        const negativeCase = contactCase.emailCase.negativeTest
        const trueExample = contactCase.trueExample    

        beforeEach(() => {
            cy.get("@nameInput").type(trueExample.name)
            cy.get("@message").type(trueExample.message)
        })

        afterEach(() => {
            cy.get("@nameInput").clear()
            cy.get("@emailInput").clear()
            cy.get("@message").clear()
        })

        // Positive Test
        positiveCase.forEach(testCase => {
            it(`Positive Test: ${testCase.desc}`, () => {
                cy.get("@emailInput").type(testCase.email)
                cy.get("@submitBtn").should("not.be.disabled")
            })
        })

        // Negative Test
        negativeCase.forEach(testCase => {
            it(`Negative Test: ${testCase.desc}`, () => {
                cy.get("@emailInput").type(testCase.email)
                cy.get("@submitBtn").should("be.disabled")
                if (testCase.assertion) {
                    cy.contains("Please enter a valid email address")
                }
            })
        })

        it("Empty Test", () => {
            cy.get("@submitBtn").should("be.disabled")
        })

    })


})