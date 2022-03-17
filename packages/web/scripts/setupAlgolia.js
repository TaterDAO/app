// Libs
const algolia = require("algoliasearch");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development.local" });

const client = algolia(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_SEARCH_KEY
);

const chains = ["localhost", "rinkeby", "mainnet"];

(async () => {
  try {
    for await (id of chains) {
      const index = client.initIndex(`titles-${id}`);
      await index.setSettings({
        searchableAttributes: [
          "tokenId",
          "name",
          "description",
          "attr.LandClassification",
          "attr.Location",
          "attr.Parcels",
          "attr.Owner",
          "attr.Tag"
        ],
        attributesForFaceting: ["filterOnly(owner)"]
      });
    }
  } catch (error) {
    throw error;
  }
})();
