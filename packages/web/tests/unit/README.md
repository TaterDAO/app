# Unit Tests

## Running Locally

To successfully run unit tests on your local machine, you must first prepare your environment by setting up the Hardhat chain.

1. Start Hardhat Chain

   ```shell
   cd modules/contracts
   yarn hardhat node
   ```

2. Apply Migration:00.

   ```shell
   yarn hardhat migration:00 --network localhost
   ```

3. Run tests

   ```shell
   cd modules/web
   yarn test:unit
   ```
