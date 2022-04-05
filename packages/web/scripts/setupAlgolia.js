// Libs
const algolia = require("algoliasearch");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development.local" });

const client = algolia(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_SEARCH_KEY
);

const chains = ["localhost", "rinkeby", "mainnet"];

const defaultRankings = [
  "typo",
  "geo",
  "words",
  "filters",
  "proximity",
  "attribute",
  "exact",
  "custom"
];

const sortableFields = ["landClassification", "location", "parcels", "owner"];

(async () => {
  try {
    for await (const id of chains) {
      const indexId = `titles-${id}`;

      // Create replica index ids
      const replicaIndexIds = [];
      sortableFields.forEach((field) => {
        replicaIndexIds.push(`${indexId}-${field}_asc`);
        replicaIndexIds.push(`${indexId}-${field}_desc`);
      });

      console.log(`Creating index: ${indexId}`);
      const index = client.initIndex(indexId);
      await index.setSettings({
        searchableAttributes: [
          //"tokenId",
          "name",
          "description"
          // "attr.LandClassification",
          // "attr.Location",
          // "attr.Parcels",
          // "attr.Owner",
          // "attr.Tag"
        ],
        attributesForFaceting: ["filterOnly(owner)"],
        ranking: ["asc(name)", ...defaultRankings],
        replicas: replicaIndexIds
      });

      // Set up replica rankings
      for await (const replicaIndexId of replicaIndexIds) {
        console.log(`Configuring replica: ${replicaIndexId}`);

        const order = replicaIndexId.split("_")[1];
        const field = replicaIndexId
          .replace(`${indexId}-`, "")
          .replace(`_${order}`, "");

        await client.initIndex(replicaIndexId).setSettings({
          ranking: [`${order}(${field})`, ...defaultRankings]
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
})();
