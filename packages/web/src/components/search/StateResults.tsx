// Libs
import { connectStateResults } from "react-instantsearch-dom";
import styled from "styled-components";

// Types
import type { StateResultsProvided } from "react-instantsearch-core";

// Hooks
import useWeb3 from "@hooks/useWeb3";

// Components
import ConnectWalletForm from "@components/ConnectWalletForm";

const NoResults = styled.h3`
  margin-top: var(--global-space-y-margin);
  color: var(--global-color-font-secondary);
`;

const StateResults: React.FC<StateResultsProvided> = ({
  searchResults,
  ...props
}) => {
  const web3 = useWeb3();

  const noResults = searchResults?.nbHits === 0;
  return web3.initialized && !web3.wallet.connected ? (
    <ConnectWalletForm />
  ) : noResults ? (
    <NoResults>0 Titles Minted</NoResults>
  ) : (
    <></>
  );
};

export default connectStateResults(StateResults);
