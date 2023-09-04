# How to run the project
1. Add an **.env** file that contains the following

    ```
    CYPRESS_REMOTE_DEBUGGING_PORT=9222
    ```
2. Add a **cypress.env.json** file that contains the following

    ```
    {
    "SKIP_METAMASK_INSTALL": true,
    "SKIP_METAMASK_SETUP": true,
    "NETWORK_GOERLI": "goerli",
    "NETWORK_MAINNET": "mainnet",
    "SECRET_WORDS": your_secret_words,
    "PRIVATE_KEY": your_private_key,
    "ACCOUNT_ADDRESS": your_account_address,
    "PASSWORD": "QQqq1111",
    "REMOTE_DEBUGGING_PORT": 9222
    }   
    ```
3. yarn

4. yarn cypress-run