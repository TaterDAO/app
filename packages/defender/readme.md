# OpenZeppelin Defender

## Autotasks

### Structure

Each autotask must define an identically named subdirectory within `src/autotasks` that contains `index.ts` file exporting a single `handler` function. **Alternatively, clone `autotasks/hello-world`**.

### Local Development

```shell
yarn build
node dist/autotasks/<task name>
```

### Deploying

```shell
yarn deploy <task name>
```
