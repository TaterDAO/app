// Libs
import { connectSearchBox } from "react-instantsearch-dom";
import styled from "styled-components";

// Types
import type { SearchBoxProvided } from "react-instantsearch-core";

// Components
import Input from "@components/ui/Input";
import React from "react";

const Container = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled(Input).attrs({
  type: "search"
})`
  width: 100%;
  font-weight: 700;
  font-size: 1.5rem;
`;

const SearchBox: React.FC<SearchBoxProvided> = ({
  currentRefinement,
  refine
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value as string;
    refine(query);
  };

  return (
    <Container>
      <SearchInput
        placeholder="Search TaterDAO"
        value={currentRefinement}
        onChange={handleChange}
      />
    </Container>
  );
};

export default connectSearchBox(SearchBox);
