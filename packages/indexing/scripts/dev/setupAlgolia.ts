// Libs
import algolia from "../../src/algolia";

// TODO: Update for Arbitrum
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
      const replicaIndexIds: Array<string> = [];
      sortableFields.forEach((field) => {
        replicaIndexIds.push(`${indexId}-${field}_asc`);
        replicaIndexIds.push(`${indexId}-${field}_desc`);
      });

      console.log(`Creating index: ${indexId}`);
      const index = algolia.initIndex(indexId);
      await index.setSettings({
        searchableAttributes: [
          //"tokenId",
          "name",
          "description",
          "attr.LandClassification",
          "attr.Location",
          "attr.Parcels",
          "attr.Owner",
          "attr.Tag"
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

        await algolia.initIndex(replicaIndexId).setSettings({
          ranking: [`${order}(${field})`, ...defaultRankings]
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
})();
