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

// Libs
import styled from "styled-components";

// Utils
import { csr } from "@utils/browser";

const Footer = styled.div`
  margin-top: var(--global-space-y-margin);
  display: flex;
  justify-content: center;
`;

const Search: React.FC<{}> = () => {
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
  // EFFECTS
  //
  //

  const isClient = csr();
  useEffect(() => {
    const refine = async () => {
      const refinements: any[] = [];
      if (queryValue !== "") {
        refinements.push(where("metadata.name", ">=", queryValue));
        refinements.push(where("metadata.name", "<=", `${queryValue}~`));
      }
      const q = query(metadataCollection, ...refinements);

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        metadata: doc.data().metadata as v230203TaterMetadataSchema
      }));
      set(data);
      setLoaded(true);
    };
    if (isClient) refine();
  }, [isClient, queryValue]);

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
