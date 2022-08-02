import type { SearchClient } from "algoliasearch";
import type { RawMetadata } from "../types/contract";
import algolia from "algoliasearch";

function makeAlgoliaClient(
  applicationId: string,
  adminKey: string
): SearchClient {
  return algolia(applicationId, adminKey);
}

/**
 * Serializes titles for Algolia.
 * @param titles
 * @returns
 */
function serializeTitles(titles: Array<RawMetadata | null>): Array<any> {
  return titles
    .filter((title) => title)
    .map((data) => {
      const {
        tokenId,
        owner,
        name,
        description,
        external_url,
        image,
        attributes
      } = data as RawMetadata;

      return {
        objectID: tokenId,
        tokenId: parseInt(tokenId),
        owner: owner.toLowerCase(),
        name,
        description,
        externalUrl: external_url,
        image,
        "attr.LandClassification": attributes[0].value,
        "attr.Location": attributes[1].value,
        "attr.Deed": attributes[2].value,
        "attr.Parcels": attributes[3].value,
        "attr.Owner": attributes[4].value,
        "attr.Kml": attributes[5].value,
        "attr.Tag": attributes[6].value,
        "attr.CreatedDate": parseInt(attributes[7].value),
        "attr.MaxSupply": parseInt(attributes[8].value)
      };
    });
}

export default makeAlgoliaClient;
export { serializeTitles };
