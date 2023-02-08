// Components
import Hits from "@components/search/Hits";
import SearchHeader from "./Header";

// Types
import type { v230203TaterMetadataSchema } from "@T/TATR";

// Services
import { query, getDocs, where } from "firebase/firestore";
import { metadataCollection } from "@services/Firebase";

// Hooks
import { useEffect, useState } from "react";
import useTokensByOwner from "@hooks/useTokensByOwner";

// Libs
import styled from "styled-components";

// Utils
import { csr } from "@utils/browser";
import { chunk } from "@utils/array";
import { asyncForEach } from "@utils/async";

const Footer = styled.div`
  margin-top: var(--global-space-y-margin);
  display: flex;
  justify-content: center;
`;

const Search: React.FC<{
  // Should search results be filtered by owner address?
  // If so, `byOwner` should be set to the address.
  ownerAddress?: string;
}> = ({ ownerAddress }) => {
  //const [paginationCursor, setPaginationCursor] = useState<number>(1);

  //
  //
  // STATE
  //
  //

  const [loaded, setLoaded] = useState<boolean>(false);

  const [queryValue, setQueryValue] = useState<string>("");

  const [hits, set] = useState<
    Array<{ id: string; metadata: v230203TaterMetadataSchema }>
  >([]);

  //
  //
  // HOOKS
  //
  //

  const filterByOwner = !!ownerAddress;
  const { tokenIds, isSuccessful: ownerQueryIsSuccessful } =
    useTokensByOwner(ownerAddress);

  //
  //
  // EFFECTS
  //
  //

  /**
   * Trigger search.
   */
  const isClient = csr();
  useEffect(() => {
    const refine = async () => {
      const docs: any[] = [];
      const refinements: any[] = [];

      // Filter by query value
      // TODO: Re-enable text filtering
      // if (queryValue !== "") {
      //   refinements.push(where("metadata.name", ">=", queryValue));
      //   refinements.push(where("metadata.name", "<=", `${queryValue}~`));
      // }

      if (tokenIds.size > 0) {
        // It's necessary to chunk ids because Firebase limits to 10 per query.
        await asyncForEach(chunk(Array.from(tokenIds), 10), async (ids) => {
          const snapshot = await getDocs(
            query(
              metadataCollection,
              ...[where("__name__", "in", ids), ...refinements]
            )
          );
          snapshot.forEach((doc) => docs.push(doc));
        });
      } else {
        const q = query(metadataCollection, ...refinements);
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => docs.push(doc));
      }
      const data = docs.map((doc) => ({
        id: doc.id,
        metadata: doc.data().metadata as v230203TaterMetadataSchema
      }));

      set(data);
      setLoaded(true);
    };

    // Do not search during SSR.
    if (!isClient) return;

    if (filterByOwner) {
      // Wait for query to finish
      if (!ownerQueryIsSuccessful) return;

      // Nothing to query for
      if (tokenIds.size === 0) {
        setLoaded(true);
        return;
      }
    }

    refine();
  }, [isClient, filterByOwner, tokenIds, ownerQueryIsSuccessful, queryValue]);

  //
  //
  // RENDER
  //
  //

  //? For now, show all results.
  const showFooter = false;

  return (
    <>
      <SearchHeader
        queryValue={queryValue}
        setQueryValue={(value: string) => setQueryValue(value)}
      />
      <Hits hits={hits} loaded={loaded} />
      {/* {showFooter && (
        <Footer>
          <Button
            onClick={() =>
              setPaginationCursor((cursor) => {
                cursor += 25;
                return cursor;
              })
            }
          >
            Load More
          </Button>
        </Footer>
      )} */}
    </>
  );
};

Search.defaultProps = {
  state: {},
  filters: ""
};

export default Search;
