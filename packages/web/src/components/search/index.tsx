// Types
import { IndexedFields } from "@T/Search";
import type { SearchState } from "react-instantsearch-core";

// Components
import { InstantSearch } from "react-instantsearch-dom";
import Hits from "@components/search/Hits";

// Services
import algolia from "@services/Algolia";

// Hooks
import useWeb3 from "@hooks/useWeb3";

const Search: React.FC<{ state: SearchState }> = ({ state }) => {
  const web3 = useWeb3();

  return (
    <InstantSearch
      searchClient={algolia}
      indexName={`titles-${web3.network.name}`}
      searchState={state}
    >
      <Hits />
    </InstantSearch>
  );

  {
    /* <Search
        initFilters={
          {
            [IndexedFields.Owner]: [web3.wallet.address?.toLowerCase()]
          } as Filters
        }
        showQueryInput={false}
        showFilters={false}
      /> */
  }
};

export default Search;
