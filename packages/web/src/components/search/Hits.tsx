// Libs
import { connectInfiniteHits } from "react-instantsearch-dom";

// Components
import Hit from "./Hit";
import Button from "@components/ui/Button";

// Types
import type { Hit as T_Hit } from "@T/Search";

const Hits: React.FC<{
  hits: Array<any>;
  hasPrevious: boolean;
  refinePrevious: (...args: any[]) => any;
  hasMore: boolean;
  refineNext: (...args: any[]) => any;
}> = ({ hits, hasPrevious, refinePrevious, hasMore, refineNext }) => {
  return (
    <div>
      <div>
        {hits.map((hit) => (
          <Hit data={hit as T_Hit} />
        ))}
      </div>
      {hasMore && <Button onClick={refineNext}>Load More</Button>}
    </div>
  );
};

export default connectInfiniteHits(Hits);
