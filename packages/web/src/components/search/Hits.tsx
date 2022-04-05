// Libs
import { connectInfiniteHits } from "react-instantsearch-dom";
import styled from "styled-components";

// Components
import Hit from "./Hit";
import Button from "@components/ui/Button";

// Types
import type { Hit as T_Hit } from "@T/Search";
import type { InfiniteHitsProvided } from "react-instantsearch-core";

const Footer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const NoResults = styled.h4`
  color: #bbb;
`;

const Hits: React.FC<InfiniteHitsProvided> = ({
  hits,
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext
}) => {
  const showFooter = hasPrevious || hasMore;
  return hits.length ? (
    <div>
      <div>
        {hits.map((hit) => (
          <Hit key={hit.objectID} data={hit as T_Hit} />
        ))}
      </div>
      {showFooter && (
        <Footer>
          <Button onClick={refineNext}>Load More</Button>
        </Footer>
      )}
    </div>
  ) : (
    <NoResults>0 Titles Minted</NoResults>
  );
};

export default connectInfiniteHits(Hits);