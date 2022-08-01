import type { SearchClient } from "algoliasearch";
import algolia from "algoliasearch";

function makeAlgoliaClient(
  applicationId: string,
  adminKey: string
): SearchClient {
  return algolia(applicationId, adminKey);
}

export default makeAlgoliaClient;
