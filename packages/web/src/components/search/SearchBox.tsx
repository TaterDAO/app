// Libs
import styled from "styled-components";

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
})`
  width: 100%;
  font-weight: 700;
  font-size: 1rem;
`;

const SearchBox: React.FC<{
  value: string;
  refine(value: string): void;
}> = ({ value, refine }) => {
  return (
    <Container>
      <Search height={3} width={3} color="var(--global-color-font)" />
      <SearchInput
        placeholder="Search TaterDAO"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          refine(event.currentTarget.value as string)
        }
      />
    </Container>
  );
};

export default SearchBox;
