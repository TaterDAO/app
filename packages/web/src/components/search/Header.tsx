import styled from "styled-components";

// Components
import SearchBox from "./SearchBox";
import Sort from "./Sort";

const Container = styled.div`
  display: flex;
  column-gap: calc(var(--global-space-y-margin) / 2);
  margin-bottom: var(--global-space-y-margin);
`;

function getSortItems(index: string) {
  return [
    { value: index, label: "Ascending: Name" },
    {
      value: `${index}-landClassification_asc`,
      label: "Ascending: Land Classification"
    },
    // {
    //   value: `${index}-location_asc`,
    //   label: "Ascending: Location"
    // },
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
    // {
    //   value: `${index}-location_desc`,
    //   label: "Descending: Location"
    // },
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

const SearchHeader: React.FC<{
  queryValue: string;
  setQueryValue(value: string): void;
}> = ({ queryValue, setQueryValue }) => {
  return (
    <Container>
      <SearchBox value={queryValue} refine={setQueryValue} />
      {/* <Sort items={getSortItems(index)} disabled={false} /> */}
    </Container>
  );
};

export default SearchHeader;
