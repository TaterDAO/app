// Libs
import { connectStateResults } from "react-instantsearch-dom";
import styled from "styled-components";

import type { StateResultsProvided } from "react-instantsearch-core";

const NoResults = styled.h4`
  margin-top: 2rem;
  color: #bbb;
`;

const StateResults: React.FC<StateResultsProvided> = ({
  searchResults,
  ...props
}) => {
  const noResults = searchResults?.nbHits === 0;
  return noResults ? <NoResults>0 Titles Minted</NoResults> : <></>;
};

export default connectStateResults(StateResults);
