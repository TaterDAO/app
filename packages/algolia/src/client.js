const algolia = require("algoliasearch");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development.local" });

module.exports = algolia(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_KEY
);
