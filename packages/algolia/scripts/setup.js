const client = require("../src/client");

//! MODIFY PRIOR TO RUNNING
const chain = "arbitrum_goerli"; // only run for one chain at a time
const sortableFields = [
  "landClassification",
  "buildingClassification",
  "parcels",
  "owner"
];

const DEFAULT_RANKINGS = [
  "typo",
  "geo",
  "words",
  "filters",
  "proximity",
  "attribute",
  "exact",
  "custom"
];

(async () => {
  try {
    const indexId = `titles-${chain}`;

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
        "description",
        "attr.LandClassification",
        "attr.BuildingClassification",
        "attr.Parcels",
        "attr.Owner",
        "attr.Tag"
      ],
      attributesForFaceting: ["filterOnly(owner)"],
      ranking: ["asc(name)", ...DEFAULT_RANKINGS],
      replicas: replicaIndexIds
    });

    // Set up replica rankings. Each replica is defined ranks by one
    // of the sortable fields in either ascending or descending order.
    for await (const replicaIndexId of replicaIndexIds) {
      console.log(`Configuring replica: ${replicaIndexId}`);

      // Determine field and order
      const fieldId = replicaIndexId.replace(indexId, "");
      const [fieldName, order] = fieldId.split("_");
      const rank = `${order}(${fieldName.replace("-", "")})`;

      await client.initIndex(replicaIndexId).setSettings({
        ranking: [rank, ...DEFAULT_RANKINGS]
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
})();
