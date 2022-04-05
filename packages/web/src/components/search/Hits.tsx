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

const Hits: React.FC<InfiniteHitsProvided> = ({
  hits,
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext
}) => {
  const showFooter = hasPrevious || hasMore;
  return (
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
  );
};

export default connectInfiniteHits(Hits);
