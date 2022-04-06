import styled from "styled-components";

// Components
import SearchBox from "./SearchBox";
import Sort from "./Sort";

// Hooks
import useWeb3 from "@hooks/useWeb3";

const Container = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
  border: 1px solid var(--color-accent-gray);
  padding: 1rem;
  border-radius: 8px;
`;

function getSortItems(index: string) {
  return [
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
  ];
}

const SearchHeader: React.FC<{ index: string }> = ({ index }) => {
  const web3 = useWeb3();
  const needsConnection = web3.initialized && !web3.wallet.connected;
  return (
    <Container>
      <SearchBox disabled={needsConnection} />
      <Sort
        defaultRefinement={index}
        items={getSortItems(index)}
        disabled={needsConnection}
      />
    </Container>
  );
};

export default SearchHeader;
