# TaterDAO App

[![Tests](https://github.com/TaterDAO/app/actions/workflows/tests.yml/badge.svg)](https://github.com/TaterDAO/app/actions/workflows/tests.yml)
[![Index Contract](https://github.com/TaterDAO/app/actions/workflows/index-contract.yml/badge.svg)](https://github.com/TaterDAO/app/actions/workflows/index-contract.yml)

## Development

### Setup

1. Start local blockchain & Graph Node.

  ```shell
  > docker compose up
  ```

2. If fresh install, deploy contract to local blockchain

  ```shell
  > cd packages/contracts
  > yarn deploy:dev
  ```

  Note the proxy address.  It needs to be updated within `packages/web/src/configs/networks.ts` and `packages/subgraphs/titles/manifests/localhost.yaml`.

3. If fresh install, deploy titles subgraph

  ```shell
  > cd packages/subgraphs/titles
  > yarn dev:create
  > yarn dev:deploy
  ```

4. Start web app

  ```shell
  > cd packages/web
  > yarn dev:start
  ```

### Metamask

#### Network

- Name: `TATERDAO - Local Arbitrum`
- Host: `http://localhost:8545`
- ChainId: `421612`
- Currency: `ETH`

#### Wallet

- Name: `TATERDAO - Local Dev`
- Private Key: `0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d`