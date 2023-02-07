// Components
import Hits from "@components/search/Hits";
import SearchHeader from "./Header";
import Button from "@components/ui/Button";

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
  byOwner?: string;
}> = ({ byOwner }) => {
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

  const metadataIds = useTokensByOwner(byOwner);

  //
  //
  // EFFECTS
  //
  //

  const isClient = csr();
  useEffect(() => {
    const refine = async () => {
      const docs: any[] = [];
      if (metadataIds.size > 0) {
        // It's necessary to chunk ids because Firebase limits to 10 per query.
        await asyncForEach(chunk(Array.from(metadataIds), 10), async (ids) => {
          const snapshot = await getDocs(
            query(metadataCollection, where("__name__", "in", ids))
          );
          snapshot.forEach((doc) => docs.push(doc));
        });
      } else if (queryValue !== "") {
        const refinements: any[] = [
          where("metadata.name", ">=", queryValue),
          where("metadata.name", "<=", `${queryValue}~`)
        ];
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
    if (isClient) refine();
  }, [isClient, queryValue, metadataIds]);

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
