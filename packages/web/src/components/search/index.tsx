// Types
import type { SearchState } from "react-instantsearch-core";

// Components
import {
  InstantSearch,
  Configure,
  Pagination,
  InfiniteHits
} from "react-instantsearch-dom";
import Hits from "@components/search/Hits";
import Hit from "./Hit";

// Services
import algolia from "@services/Algolia";

// Hooks
import useWeb3 from "@hooks/useWeb3";

const Search: React.FC<{
  /**
   * @see https://www.algolia.com/doc/api-reference/widgets/ui-state/react/
   */
  state?: SearchState;
  filters?: string;
}> = ({ state, filters }) => {
  const web3 = useWeb3();

  return (
    <InstantSearch
      searchClient={algolia}
      indexName={`titles-${web3.network.name}`}
    >
      <Configure hitsPerPage={10} filters={filters} />
      <Hits />
    </InstantSearch>
  );
};

Search.defaultProps = {
  state: {},
  filters: ""
};

export default Search;
