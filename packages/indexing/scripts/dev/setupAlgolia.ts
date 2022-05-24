// Libs
import algolia, { deleteIndices } from "../../src/algolia";
import { NETWORKS } from "../../src/constants";

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
    // Delete existent indices
    await deleteIndices();

    // Create new indices
    for await (const id of NETWORKS) {
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

        const order = replicaIndexId.includes("asc") ? "asc" : "desc";
        const field = replicaIndexId
          .replace(`${indexId}-`, "")
          .replace(`_${order}`, "");

        console.log(field);

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
