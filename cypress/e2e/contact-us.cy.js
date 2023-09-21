describe("Test Contact Us Module", () => {
    const contactCase = require("../fixtures/contact-us.json")
    const trueExample = contactCase.trueExample 

    before(() => {
        cy.visit("/contact")
    })

    beforeEach(() => {
        cy.get("select").as("selector")
        cy.get("input").eq(0).as("nameInput")
        cy.get("input").eq(1).as("emailInput")
        cy.get("textarea").as("messageTextarea")
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
        
        beforeEach(() => {
            cy.get("@emailInput").type(trueExample.email)
            cy.get("@messageTextarea").type(trueExample.message)
        })

        afterEach(() => {
            cy.get("@nameInput").clear()
            cy.get("@emailInput").clear()
            cy.get("@messageTextarea").clear()
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

        beforeEach(() => {
            cy.get("@nameInput").type(trueExample.name)
            cy.get("@messageTextarea").type(trueExample.message)
        })

        afterEach(() => {
            cy.get("@nameInput").clear()
            cy.get("@emailInput").clear()
            cy.get("@messageTextarea").clear()
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


    describe("Message Textarea Test", () => {
        const positiveCase = contactCase.messageCase.positiveTest   
        
        beforeEach(() => {
            cy.get("@nameInput").type(trueExample.name)
            cy.get("@emailInput").type(trueExample.email)
        })

        afterEach(() => {
            cy.get("@nameInput").clear()
            cy.get("@emailInput").clear()
            cy.get("@messageTextarea").clear()
        })
        
        // Positive Test
        positiveCase.forEach(testCase => {
            it(`Positive Test: ${testCase.desc}`, () => {
                cy.get("@messageTextarea").type(testCase.message)
                cy.get("@submitBtn").should("not.be.disabled")
            })
        })

        it("Empty Test", () => {
            cy.get("@submitBtn").should("be.disabled")
        })

    })

    
    describe("Submit Button Test", () => {
        const msgType = contactCase.msgType
        // const trueExample = contactCase.trueExample 

        it("Normal submission", () => {
                cy.get("@selector").select(msgType[Math.floor(Math.random()*msgType.length)])
                cy.get("@nameInput").type(trueExample.name)
                cy.get("@emailInput").type(trueExample.email)
                cy.get("@messageTextarea").type(trueExample.message)
                cy.get("@submitBtn").click()
                cy.contains("Sent Successfully")
            
        })
    })


})