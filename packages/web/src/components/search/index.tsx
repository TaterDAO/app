// Types
import type { SearchState } from "react-instantsearch-core";

// Components
import { InstantSearch, Configure } from "react-instantsearch-dom";
import Hits from "@components/search/Hits";
import StateResults from "./StateResults";
import SearchBox from "./SearchBox";
import Sort from "./Sort";

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
  const index = `titles-${web3.network.name}`;

  return (
    <InstantSearch searchClient={algolia} indexName={index}>
      <SearchBox />
      <Configure hitsPerPage={10} filters={filters} />
      <Sort
        defaultRefinement={index}
        items={[
          { value: index, label: "Ascending: Name" },
          {
            value: `${index}-landClassification_asc`,
            label: "Ascending: Land Classification"
          },
          {
            value: `${index}-location_asc`,
            label: "Ascending: Location"
          },
          {
            value: `${index}-owner_asc`,
            label: "Ascending: Owner"
          },
          {
            value: `${index}-parcels_asc`,
            label: "Ascending: Parcels"
          },
          {
            value: `${index}-landClassification_desc`,
            label: "Descending: Land Classification"
          },
          {
            value: `${index}-location_desc`,
            label: "Descending: Location"
          },
          {
            value: `${index}-owner_desc`,
            label: "Descending: Owner"
          },
          {
            value: `${index}-parcels_desc`,
            label: "Descending: Parcels"
          }
        ]}
      />
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
