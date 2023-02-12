// Hooks
import { useAccount } from "wagmi";
import useTokenOwners from "@hooks/useTokenOwners";
// Services
import { chainsById } from "@services/WalletConnect";
// Components
import { ChainName, Row, NamedProperty, ActionButtons } from "./UI";
import Button from "@components/ui/Button";
import BurnForm from "@components/BurnForm";
import ProfileLink from "@components/ProfileLink";
// Constants
import { CONTRACT_ADDRESSES } from "@constants/contract";
// Libs
import DeleteMetadataButton from "@components/DeleteMetadataButton";

// Allow a 60m window for tokens mint transactions to confirm.
const CONFIRMATION_TIME_WINDOW = 60;

const ChainData: React.FC<{
  metadataId: string;
  creatorAddress: string;
  createdAt: string;
  tokens: Array<{ chainId: number; tokenId: number; burnt: boolean }>;
}> = ({ metadataId, creatorAddress, createdAt, tokens }) => {
  const { data: ownerIds, isLoading: loadingOwners } = useTokenOwners(tokens);
  const { address } = useAccount();

  // If token was minted recently, transaction may not have been processed through all
  // of the necessary confirmations. As such, show a message to the user.
  const now = new Date();
  const creationDatetime = new Date(createdAt);
  //@ts-ignore
  const diff = now - creationDatetime;
  const diffMinutes = Math.floor(diff / 1000 / 60);

  return tokens.length === 0 ? (
    <>
      <Row>
        <strong>No Minted Tokens</strong>
      </Row>
      {address === creatorAddress && (
        <>
          {/* <Row>
            <p>
              If you recently burned this Title and would like to remove it from
              TaterDAO, click here:
            </p>
          </Row>
          <Row>
            <DeleteMetadataButton />
          </Row> */}
          {diffMinutes <= CONFIRMATION_TIME_WINDOW && (
            <Row>
              <p>
                Recently minted tokens may still be awaiting transaction
                confirmation. Please check back shortly.
              </p>
            </Row>
          )}
          {/* <Row>
            <Button primary disabled={true} onClick={() => null}>
              Re-Mint (Coming Soon)
            </Button>
          </Row> */}
        </>
      )}
    </>
  ) : (
    <>
      {tokens.map(({ chainId, tokenId, burnt }, index) => {
        const chain = chainsById[chainId];
        const ownerId = ownerIds[index];
        const explorer = chain.blockExplorers?.default;

        return (
          <Row key={`${chainId}-token-data`}>
            <ChainName>{chain.name}</ChainName>
            <NamedProperty>
              <span>Token ID</span> <code>{tokenId}</code>
            </NamedProperty>
            <NamedProperty>
              <span>Owner</span>{" "}
              {loadingOwners ? (
                <i>Loading...</i>
              ) : (
                <ProfileLink address={ownerId} />
              )}
            </NamedProperty>
            <ActionButtons>
              {address === ownerId && (
                <BurnForm tokenId={tokenId} chain={chain} />
              )}
              {explorer && (
                <Button
                  onClick={() =>
                    window.open(
                      `${explorer.url}/token/0x${CONTRACT_ADDRESSES[chainId]}?a=${tokenId}`,
                      "_blank"
                    )
                  }
                >
                  {explorer.name}
                </Button>
              )}
            </ActionButtons>
          </Row>
        );
      })}
    </>
  );
};

export default ChainData;
