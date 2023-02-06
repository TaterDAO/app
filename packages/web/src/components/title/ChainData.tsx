// Hooks
import useTitleData from "@hooks/useTitleData";
import { useAccount } from "wagmi";
// Services
import { chainsById } from "@services/WalletConnect";
// Components
import { ChainName, Row, NamedProperty, ActionButtons } from "./UI";
import Button from "@components/ui/Button";
import BurnForm from "@components/BurnForm";
import ProfileLink from "@components/ProfileLink";
// Constants
import { CONTRACT_ADDRESSES } from "@constants/contract";

const ChainData: React.FC<{ metadataId: string }> = ({ metadataId }) => {
  const {
    tokenIds,
    ownerIds,
    isLoading: titleDataIsLoading
  } = useTitleData(metadataId);

  const { address } = useAccount();

  return (
    <>
      {!titleDataIsLoading &&
        tokenIds.map(([chainId, tokenId], index) => {
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
                <span>Owner</span> <ProfileLink address={ownerId} />
              </NamedProperty>
              <ActionButtons>
                {address === ownerId && <BurnForm tokenId={tokenId} />}
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
