// Types
import type { SearchState } from "react-instantsearch-core";

// Components
import { InstantSearch, Configure } from "react-instantsearch-dom";
import Hits from "@components/search/Hits";
import StateResults from "./StateResults";

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
      <StateResults />
    </InstantSearch>
  );
};

Search.defaultProps = {
  state: {},
  filters: ""
};

export default Search;
