// Libs
import { connectSearchBox } from "react-instantsearch-dom";
import styled from "styled-components";

// Types
import type { SearchBoxProvided } from "react-instantsearch-core";

// Components
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";

const Container = styled.div`
  margin-bottom: 2rem;

  display: flex;
`;

const SearchInput = styled(Input).attrs({
  type: "search"
})`
  width: 100%;
  font-weight: 700;
  font-size: 1.5rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const ResetButton = styled(Button)`
  width: 100px;
  background-color: var(--color-blue-magenta);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const SearchBox: React.FC<SearchBoxProvided> = ({
  currentRefinement,
  refine
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value as string;
    refine(query);
  };

  const handleReset = () => {
    refine("");
  };

  return (
    <Container>
      <SearchInput
        placeholder="Search TaterDAO"
        value={currentRefinement}
        onChange={handleChange}
      />
      <ResetButton onClick={handleReset}>Reset</ResetButton>
    </Container>
  );
};

export default connectSearchBox(SearchBox);
