// Libs
import { connectStateResults } from "react-instantsearch-dom";
import styled from "styled-components";

// Types
import type { StateResultsProvided } from "react-instantsearch-core";

// Hooks
import useWeb3 from "@hooks/useWeb3";

const NoResults = styled.h4`
  margin-top: 2rem;
  color: #bbb;
`;

const StateResults: React.FC<StateResultsProvided> = ({
  searchResults,
  ...props
}) => {
  const web3 = useWeb3();

  const noResults = searchResults?.nbHits === 0;
  return web3.initialized && !web3.wallet.connected ? (
    <NoResults>Please connect your wallet to continue</NoResults>
  ) : noResults ? (
    <NoResults>0 Titles Minted</NoResults>
  ) : (
    <></>
  );
};

export default connectStateResults(StateResults);
