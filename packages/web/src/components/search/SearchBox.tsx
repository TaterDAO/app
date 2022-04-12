// Libs
import { connectSearchBox } from "react-instantsearch-dom";
import styled from "styled-components";

// Types
import type { SearchBoxProvided } from "react-instantsearch-core";

// Components
import { Input } from "@components/ui/Form";
import Button from "@components/ui/Button";
import { Search } from "iconoir-react";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SearchInput = styled(Input).attrs({
  type: "search"
})<{ hasValue: boolean }>`
  width: 100%;
  font-weight: 700;
  font-size: 1rem;
  border-top-right-radius: ${({ hasValue }) =>
    hasValue ? "0" : "var(--global-border-radius)"};
  border-bottom-right-radius: ${({ hasValue }) =>
    hasValue ? "0" : "var(--global-border-radius)"};
`;

const ResetButton = styled(Button)<{ visible: boolean }>`
  width: ${({ visible }) => (visible ? "100" : "0")}px;
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:not(:disabled):hover {
    border-left: 1px solid;
  }

  opacity: ${({ visible }) => (visible ? "1" : "0")};

  ${({ visible }) => !visible && "padding: 0;"}
`;

const SearchBox: React.FC<SearchBoxProvided & { disabled: boolean }> = ({
  currentRefinement,
  refine,
  disabled
}) => {
  const hasValue = currentRefinement.length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value as string;
    refine(query);
  };

  const handleReset = () => {
    refine("");
  };

  return (
    <Container>
      <Search height={3} width={3} color="var(--global-color-font)" />
      <SearchInput
        placeholder="Search TaterDAO"
        value={currentRefinement}
        onChange={handleChange}
        disabled={disabled}
        hasValue={hasValue}
      />
      <ResetButton onClick={handleReset} disabled={disabled} visible={hasValue}>
        Reset
      </ResetButton>
    </Container>
  );
};

SearchBox.defaultProps = {
  disabled: false
};

export default connectSearchBox(SearchBox);
