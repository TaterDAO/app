# OpenZeppelin Defender

## Autotasks

Autotasks run lambda functions invoked via cron, webhooks or in response to an on-chain transactions.

- [Docs](https://docs.openzeppelin.com/defender/autotasks)

### Structure

Each autotask must define an identically named subdirectory within `src/autotasks` that contains `index.ts` file exporting a single `handler` function. **Alternatively, clone `autotasks/hello-world`**.

### Development

#### Setup

```shell
nvm use stable
yarn install
```

#### Running an Autotask on your Local Machine

```shell
yarn build
node dist/autotasks/<task name>
```

### Production

#### Building

```shell
nvm use # In production, autotasks are executed in a Node 16 runtime.
yarn ncc build src/autotasks/<task name>/index.ts -o dist/autotasks/<task name> -m
```

#### Deploying

```shell
yarn autotask:deploy <task name>
```

#### Testing

You are able to test `sync-goerli` and `sync-mainnet` by POST'ing to their respective Webhook URLs with bodies such as those found in [data/mocks](data/mocks/).

#### Backfilling

In order to backfill a new replica, run the script below.

```shell
scripts:backfill:replica
```
