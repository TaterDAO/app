import algolia from "algoliasearch";
import { config } from "dotenv";

config({ path: ".env" });

const client = algolia(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_SEARCH_KEY as string
);

async function deleteIndices() {
  // Primary indices only
  client.listIndices().then(({ items }) => {
    const ops: Array<any> = items
      .filter(({ name, primary }) => !primary)
      .map(({ name }) => {
        return {
          indexName: name,
          action: "delete"
        };
      });

    return client.multipleBatch(ops);
  });

  // Primary and replica indices
  client.listIndices().then(({ items }) => {
    const { primaryOps, replicaOps } = items.reduce(
      (memo, { name, primary }) => {
        memo[primary ? "primaryOps" : "replicaOps"].push({
          //@ts-expect-error
          indexName: name,
          //@ts-expect-error
          action: "delete"
        });
        return memo;
      },
      { primaryOps: [], replicaOps: [] }
    );
    return client
      .multipleBatch(primaryOps)
      .wait()
      .then(() => {
        console.log("Done deleting primary indices");
        return client.multipleBatch(replicaOps).then(() => {
          console.log("Done deleting replica indices");
        });
      });
  });
}

export default client;
export { deleteIndices };
