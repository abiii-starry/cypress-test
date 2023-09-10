describe("root-des", ()=> {
    before(() => {
        cy.log("⭐⭐⭐i am root des--before⭐⭐⭐")
    })

    beforeEach(() => {
        cy.log("⭐⭐⭐i am root des--beforeEach⭐⭐⭐")
    })

    after(() => {
        cy.log("==========end==========")
    })

    it("testcase-root", () => {
        cy.log("⭐⭐⭐i am root des--test-case⭐⭐⭐")
    })

    describe("inner-des", () => {
        before(() => {
            cy.log("♥i am inner des--before♥")
        })
        
        beforeEach(() => {
            cy.log("♥i am inner des--beforeEach♥")
        })
        
        it("inner-testcase", () => {
            cy.log("♥i am inner des--test-case♥")
        })

        it("inner-testcase2", () => {
            cy.log("♥i am inner des--test-case2♥")
        })

    })
})

describe("root-2", () => {
    it("asd", () => {
        cy.log("❓i am root2❓")
    })
})