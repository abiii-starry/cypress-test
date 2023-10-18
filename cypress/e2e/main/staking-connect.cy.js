describe("Test connect staking web", { testIsolation: true },() => {
    const SECRET_WORDS = Cypress.env("SECRET_WORDS")
    const NETWORK_GOERLI = Cypress.env("NETWORK_GOERLI")
    const PASSWORD = Cypress.env("PASSWORD")
    const NETWORK_MAINNET = Cypress.env("NETWORK_MAINNET")

    before(() => {
        cy.setupMetamask(SECRET_WORDS, NETWORK_GOERLI, PASSWORD)
    })

    beforeEach(() => {
        cy.visit('/ethereum/staking?step=1')
    })

    it("Switch to chain in web [Connected]", () => {
        cy.toConnect()

        cy.switchChain(NETWORK_MAINNET)
        cy.allowMetamaskToSwitchNetwork()
        cy.contains("Ethereum Staking")

        cy.switchChain(NETWORK_GOERLI)
        cy.allowMetamaskToSwitchNetwork()
        cy.contains("Goerli Ethereum Staking")
    })

    it("Switch to chain in Metamask [Connected]", () => {
        cy.toConnect()

        cy.changeMetamaskNetwork(NETWORK_MAINNET)
        cy.contains("Ethereum Staking")
        
        cy.changeMetamaskNetwork(NETWORK_GOERLI)
        cy.contains("Goerli Ethereum Staking")
    })

    it("Switch to an unsupported chain in Metamask [Connected]", () => {
        cy.toConnect()

        cy.changeMetamaskNetwork("Sepolia")
        cy.contains("Switch Network")
        cy.contains("Please switch your wallet's network to use Stake DxPool")
    })

})