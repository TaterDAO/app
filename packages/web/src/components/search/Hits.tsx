// Libs
import { connectInfiniteHits } from "react-instantsearch-dom";
import styled from "styled-components";

// Components
import Hit from "./Hit";
import Button from "@components/ui/Button";

// Types
import type { Hit as T_Hit } from "@T/Search";
import type { InfiniteHitsProvided } from "react-instantsearch-core";

// Services
import { query, getDocs } from "firebase/firestore";
import { metadataCollection } from "@services/Firebase";

// Hooks
import { useEffect, useState } from "react";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--global-space-margin);
`;

const Footer = styled.div`
  margin-top: var(--global-space-y-margin);
  display: flex;
  justify-content: center;
`;

const Hits: React.FC<InfiniteHitsProvided> = ({
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext
}) => {
  const [hits, set] = useState<Array<T_Hit>>();

  useEffect(() => {
    (async () => {
      const q = query(metadataCollection);
      const snapshot = await getDocs(q);
      const data: Array<T_Hit> = [];
      snapshot.forEach((doc) => {
        data.push({ tokenId: doc.id, ...doc.data() });
      });
      set(data);
    })();
  }, []);

  const showFooter = hasPrevious || hasMore;
  return (
    <div>
      <Container>
        {hits !== undefined ? (
          hits.map((hit) => <Hit key={hit.objectID} data={hit as T_Hit} />)
        ) : (
          <i>Loading...</i>
        )}
      </Container>
      {showFooter && (
        <Footer>
          <Button onClick={refineNext}>Load More</Button>
        </Footer>
      )}
    </div>
  );
};

export default connectInfiniteHits(Hits);
