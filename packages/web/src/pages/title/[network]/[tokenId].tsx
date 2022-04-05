// Types
import type { NextPage, GetServerSideProps } from "next";
import type { Hit } from "@T/Search";

// Services
import algolia from "@services/Algolia";

// Libs
import styled from "styled-components";

// Components
import ProfileLink from "@components/ProfileLink";

// Data
import addresses from "@data/addresses.json";

const Name = styled.h1``;

const TokenID = styled.h5`
  color: var(--color-gray);
`;

const Row = styled.div`
  margin-top: 1rem;
`;

const NamedProperty = styled.div`
  font-weight: 500;
  span {
    font-weight: 700;
    color: var(--color-gray);
  }
`;

const ExternalUrl = styled.a`
  text-decoration: underline;
`;

const Divider = styled.hr`
  border: 0;
  border-bottom: 1px solid var(--color-accent-gray);
  margin: 2rem 0;
`;

const Description = styled.p`
  margin: 3rem 0;
  padding-left: 1rem;
`;

const Attributes = styled.table`
  tr {
    td {
      padding-top: 1rem;

      &:first-of-type {
        padding-right: 2rem;
      }
      &:nth-of-type(2) {
      }
    }
  }
`;

const ImageContainer = styled.div`
  background-color: #fafafa;
  padding: 3rem 0;
  margin-bottom: 5rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
`;

const TitlePage: NextPage<{
  title: Hit;
  etherscanHost: string | null;
  contractAddress: string | undefined;
}> = ({ title, etherscanHost, contractAddress }) => {
  const hasImage = Boolean(title.image);
  const ipfsImage = hasImage && title.image?.startsWith("ipfs");

  const etherscanUrl =
    !!etherscanHost && !!contractAddress
      ? `${etherscanHost}/token/${contractAddress}?a=${title.tokenId}`
      : null;

  return (
    <div>
      {hasImage && !ipfsImage && (
        <ImageContainer>
          <Image src={title.image} />
        </ImageContainer>
      )}
      <TokenID>Token ID: {title.tokenId}</TokenID>
      <Name>{title.name}</Name>
      <Row>
        <NamedProperty>
          <span>Created by</span> <ProfileLink address={title.owner} />
        </NamedProperty>
      </Row>
      {title.externalUrl && (
        <Row>
          <ExternalUrl
            href={`${title.externalUrl.startsWith("http") ? "" : "http://"}${
              title.externalUrl
            }`}
            target="_blank"
          >
            External URL
          </ExternalUrl>
        </Row>
      )}
      {etherscanUrl && (
        <Row>
          <ExternalUrl href={etherscanUrl} target="_blank">
            View on Etherscan
          </ExternalUrl>
        </Row>
      )}
      {ipfsImage && (
        <Row>
          <NamedProperty>
            <span>Image</span> {title.image}
          </NamedProperty>
        </Row>
      )}
      <Divider />
      <Row>
        <Description>{title.description}</Description>
      </Row>
      <Row>
        <h3>Attributes</h3>
        <Attributes>
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
            <td>{title["attr.Deed"]}</td>
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
            <td>{title["attr.Kml"]}</td>
          </tr>
          <tr>
            <td>Tags</td>
            <td>{title["attr.Tag"]}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>{new Date(title["attr.CreatedDate"]).toLocaleString()}</td>
          </tr>
          <tr>
            <td>Max Supply</td>
            <td>{title["attr.MaxSupply"]}</td>
          </tr>
        </Attributes>
      </Row>
    </div>
  );
};

const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const network = query.network as string;
  const index = algolia.initIndex(`titles-${network}`);

  const etherscanHost =
    network === "localhost"
      ? null
      : network === "mainnet"
      ? "https://etherscan.io"
      : `https://${network}.etherscan.io`;

  try {
    const hit = await index.getObject(query.tokenId as string);
    return {
      props: {
        title: hit,
        etherscanHost,
        //@ts-expect-error
        contractAddress: addresses[network]
      }
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default TitlePage;
export { getServerSideProps };
