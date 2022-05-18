import algolia from "algoliasearch";
import { config } from "dotenv";

config({ path: ".env" });

export default algolia(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_SEARCH_KEY as string
);
