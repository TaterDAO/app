# OpenZeppelin Defender

## Autotasks

### Structure

Each autotask must define an identically named subdirectory within `src/autotasks` that contains `index.ts` file exporting a single `handler` function. **Alternatively, clone `autotasks/hello-world`**.

### Local Development

```shell
nvm install # In production, autotasks are executed in a Node 12 runtime.
yarn build
node dist/autotasks/<task name>
```

### Production Build

```shell
yarn ncc build src/autotasks/<task name>/index.ts -o dist/autotasks/<task name> -m
```

### Deploying

```shell
yarn autotask:deploy <task name>
```
