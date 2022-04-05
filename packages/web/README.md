# Web

## Testing

### Integration

1. Start two terminal sessions.
2. In the first session, run `yarn dev`.
3. In the second session, run `yarn test`.

## Development

1. Start the Web Server

```shell
cd packages/web
yarn dev:start
```

2. Start the Hardhat development blockchain

```shell
cd packages/contracts
yarn dev:chain
```

3. Seed Data to Algolia

```shell
cd packages/web
yarn algolia:index:seed
```
