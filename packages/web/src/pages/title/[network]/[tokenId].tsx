// Types
import type { NextPage, GetServerSideProps } from "next";
import type { Hit } from "@T/Search";

// Services
import algolia from "@services/Algolia";

// Libs
import styled from "styled-components";
import TitleContract from "@libs/TitleContract";

// Components
import ProfileLink from "@components/ProfileLink";
import Button from "@components/ui/Button";
import BurnForm from "@components/BurnForm";

// Utils
import { getChainConfig } from "@utils/chain";

// Hooks
import useWeb3 from "@hooks/useWeb3";
import useIPFSImage from "@hooks/useIPFSImage";

const Name = styled.h1``;

const TokenID = styled.h5`
  color: var(--global-color-font-secondary);
`;

const Row = styled.div`
  margin-top: calc(var(--global-space-y-margin) / 2);
`;

const NamedProperty = styled.div`
  font-weight: 500;
  span {
    font-weight: 700;
    color: var(--global-color-font-secondary);
  }
`;

const Divider = styled.hr`
  border: 0;
  border-bottom: 1px solid var(--global-color-border);
  margin: var(--global-space-y-margin) 0;
`;

const Description = styled.p`
  margin: calc(var(--global-space-margin) * 2);
  line-height: 2;
`;

const Attributes = styled.table`
  tr {
    td {
      padding-top: 1rem;

      &:first-of-type {
        padding-right: 2rem;
        color: var(--global-color-font-secondary);
      }
      &:nth-of-type(2) {
      }
    }
  }
`;

const ImageContainer = styled.div`
  background: var(--global-color-bg-disabled);
  padding: 3rem 0;
  margin-bottom: calc(var(--global-space-y-margin) * 2);
`;

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  color: var(--global-color-font-secondary);
  font-style: italic;
  text-align: center;
  font-weight: 700;
`;

const ActionButtons = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--global-space-nav-margin);
`;

function makeURL(attr: string | undefined): URL | null {
  try {
    return new URL(attr as string);
  } catch (error) {
    // Throws if not a valid URL
    return null;
  }
}

const TitlePage: NextPage<{
  title: Hit;
  explorer: string | null;
  contractAddress: string | undefined;
  ownerAddress: string;
}> = ({ title, explorer, contractAddress, ownerAddress }) => {
  const web3 = useWeb3();
  const ipfsImage = useIPFSImage(title.image as string);

  //# Render

  const imageSrc = ipfsImage.valid
    ? ipfsImage.data
    : title.image || "/images/placeholder.jpeg";

  const explorerUrl =
    !!explorer && !!contractAddress
      ? `${explorer}/token/${contractAddress}?a=${title.tokenId}`
      : null;

  const hasExternalUrl = !!title.externalUrl;

  const deedURL = makeURL(title["attr.Deed"]);
  const kmlURL = makeURL(title["attr.Kml"]);

  return (
    <div>
      <ImageContainer>
        <Image
          src={imageSrc}
          alt={
            ipfsImage.loading
              ? "Loading image from IPFS..."
              : "Could not load image"
          }
        />
      </ImageContainer>
      <TokenID>Token ID: {title.tokenId}</TokenID>
      <Name>{title.name}</Name>
      <Row>
        <NamedProperty>
          <span>Created by</span> <ProfileLink address={title.owner} />
        </NamedProperty>
      </Row>
      <Row>
        <NamedProperty>
          <span>Owned by</span> <ProfileLink address={ownerAddress} />
        </NamedProperty>
      </Row>
      <ActionButtons>
        {ownerAddress === web3.wallet.address && (
          <Row>
            <BurnForm tokenId={title.tokenId} />
          </Row>
        )}
        {hasExternalUrl && (
          <Row>
            <Button
              onClick={() => window.open(title.externalUrl as string, "_blank")}
            >
              External URL
            </Button>
          </Row>
        )}
        {explorerUrl && (
          <Row>
            <Button onClick={() => window.open(explorerUrl, "_blank")}>
              Etherscan
            </Button>
          </Row>
        )}
      </ActionButtons>
      <Divider />
      <Row>
        <Description>{title.description}</Description>
      </Row>
      <Row>
        <h2>Attributes</h2>
        <Attributes>
          <tbody>
            {ipfsImage.valid && (
              <tr>
                <td>Pinned Image</td>
                <td>{title.image}</td>
              </tr>
            )}
            <tr>
              <td>Land Classification</td>
              <td>{title["attr.LandClassification"]}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{title["attr.Location"]}</td>
            </tr>
            <tr>
              <td>Deed</td>
              <td>
                {deedURL ? (
                  <a href={title["attr.Deed"]} target="_blank" rel="noreferrer">
                    View Deed
                  </a>
                ) : (
                  "None Provided"
                )}
              </td>
            </tr>
            <tr>
              <td>Parcels</td>
              <td>{title["attr.Parcels"]}</td>
            </tr>
            <tr>
              <td>Owner</td>
              <td>{title["attr.Owner"]}</td>
            </tr>
            <tr>
              <td>KML</td>
              <td>
                {kmlURL ? (
                  <a href={title["attr.Kml"]} target="_blank" rel="noreferrer">
                    View KML
                  </a>
                ) : (
                  "None Provided"
                )}
              </td>
            </tr>
            <tr>
              <td>Tags</td>
              <td>{title["attr.Tag"]}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>
                {new Date(title["attr.CreatedDate"] * 1000).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>Max Supply</td>
              <td>{title["attr.MaxSupply"]}</td>
            </tr>
          </tbody>
        </Attributes>
      </Row>
    </div>
  );
};

const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const tokenId = query.tokenId as string;
  const network = query.network as string;
  const index = algolia.initIndex(`titles-${network}`);

  // TODO: Hardcoded for now – added Arb mainnet
  const chainId = network === "localhost" ? 31337 : 421611;
  const chainConfig = getChainConfig(chainId);

  const contract = new TitleContract(chainId);

  try {
    const ownerAddress = await contract.getOwner(parseInt(tokenId));
    const hit = await index.getObject(tokenId);
    return {
      props: {
        title: hit,
        explorer: chainConfig?.explorer,
        contractAddress: chainConfig?.contract.address,
        ownerAddress: ownerAddress
      }
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default TitlePage;
export { getServerSideProps };
