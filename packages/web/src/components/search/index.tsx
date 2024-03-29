// Components
import dynamic from "next/dynamic";
const SearchResults = dynamic(() => import("./Results"), { ssr: false });
import SearchHeader from "./Header";

// Types
import type { v230203TaterMetadataSchema } from "@T/TATR";

// Services
import { query, getDocs } from "firebase/firestore";
import { metadataCollection, tokensCollection } from "@services/Firebase";

// Hooks
import { useEffect, useState, useMemo } from "react";
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

  const isClient = csr();

  const [queryValue, setQueryValue] = useState<string>("");

  const [records, setRecords] = useState<
    Record<
      string,
      {
        id: string;
        metadata: v230203TaterMetadataSchema;
      }
    >
  >();

  //
  //
  // HOOKS
  //
  //

  const { tokenIds, isLoading: ownerQueryIsLoading } =
    useTokensByOwner(ownerAddress);

  //
  //
  // EFFECTS
  //
  //

  /**
   * On client-side mount, load all records from Firestore.
   * This is a temporary patch (in lieu of using a 3rd party service) in order to enable
   * full-text search.
   */
  useEffect(() => {
    async function loadRecords() {
      const metadataSnapshot = await getDocs(query(metadataCollection));
      const tokensSnapshot = await getDocs(query(tokensCollection));

      // Map metadata to whether all tokens for that metadata have been burned.
      const burntMap = tokensSnapshot.docs.reduce((memo, doc) => {
        const data = doc.data();
        const metadataId = data.metadata.id;

        // If an unburnt token has been found, maintain `false`.
        return memo[metadataId] === false
          ? memo
          : { ...memo, [metadataId]: data.burnt as boolean };
      }, {}) as Record<string, boolean>;

      const docs = metadataSnapshot.docs.reduce((memo, doc) => {
        // If all of the tokens associated with metadata have been burned, filter it.
        return burntMap[doc.id]
          ? memo
          : {
              ...memo,
              [doc.id]: {
                id: doc.id,
                metadata: doc.data().metadata
              }
            };
      }, {});

      setRecords(docs);
    }
    if (isClient) loadRecords();
  }, [isClient]);

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
      <SearchResults
        loadingRecords={!records}
        records={records}
        filters={{
          byOwner: {
            active: !!ownerAddress,
            filterValue: tokenIds,
            loading: ownerQueryIsLoading
          },
          byName: {
            active: !!queryValue,
            filterValue: queryValue,
            loading: false
          }
        }}
      />
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

export default Search;
