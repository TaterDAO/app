// Types
import type { SearchState } from "react-instantsearch-core";

// Components
import { InstantSearch, Configure } from "react-instantsearch-dom";
import Hits from "@components/search/Hits";
import StateResults from "./StateResults";
import UnsupportedNetwork from "@components/UnsupportedNetwork";

// Services
import algolia from "@services/Algolia";

// Hooks
import useWeb3 from "@hooks/useWeb3";
import SearchHeader from "./Header";

const Search: React.FC<{
  /**
   * @see https://www.algolia.com/doc/api-reference/widgets/ui-state/react/
   */
  state?: SearchState;
  filters?: string;
}> = ({ state, filters }) => {
  const web3 = useWeb3();
  const index = `titles-${web3.network.id}`;

  return web3.network.supported ? (
    <InstantSearch searchClient={algolia} indexName={index}>
      <Configure hitsPerPage={10} filters={filters} />
      <SearchHeader index={index} />
      <Hits />
      <StateResults />
    </InstantSearch>
  ) : (
    <UnsupportedNetwork />
  );
};

Search.defaultProps = {
  state: {},
  filters: ""
};

export default Search;
