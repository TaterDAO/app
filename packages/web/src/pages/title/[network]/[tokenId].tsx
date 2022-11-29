// Types
import type { NextPage, GetServerSideProps } from "next";
import type { Hit } from "@T/Search";
import type { FeatureCollection, Point } from "geojson";

// Services
import algolia from "@services/Algolia";

// Libs
import styled from "styled-components";
import TitleContract from "@libs/TitleContract";
import {
  getLandClassificationFromValue,
  getBuildingClassificationFromValue,
  classificationLabel
} from "@libs/TitleClassifications";
import { isCoordinates, deserializeFeatures } from "@libs/TitleLocation";

// Components
import ProfileLink from "@components/ProfileLink";
import Button from "@components/ui/Button";
import BurnForm from "@components/BurnForm";
import Divider from "@components/ui/Divider";
import Image from "@components/title/Image";
import Map from "@components/Map";

// Utils
import { getChainConfigByInternalId } from "@utils/chain";
import { getImageSrc } from "@utils/image";

// Hooks
import useWeb3 from "@hooks/useWeb3";
import { useMemo } from "react";

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

const ActionButtons = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--global-space-nav-margin);
`;

const Banner = styled.div<{ withMap: boolean }>`
  display: grid;
  grid-template-columns: ${({ withMap }) =>
    withMap ? "repeat(2, 50%)" : "repeat(1, 100%)"};
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

  //# Render

  const explorerUrl =
    !!explorer && !!contractAddress
      ? `${explorer}/token/${contractAddress}?a=${title.tokenId}`
      : null;

  const hasExternalUrl = !!title.externalUrl;

  const deedURL = makeURL(title["attr.Deed"]);
  const kmlURL = makeURL(title["attr.Kml"]);

  // CLASSIFICATIONS
  const landClassification = useMemo(
    () => getLandClassificationFromValue(title["attr.LandClassification"]),
    []
  );

  const landClassificationLabel = !!landClassification
    ? classificationLabel(landClassification)
    : title["attr.LandClassification"];

  const buildingClassification = useMemo(
    () =>
      getBuildingClassificationFromValue(title["attr.BuildingClassification"]),
    []
  );

  const buildingClassificationLabel = !!buildingClassification
    ? classificationLabel(buildingClassification)
    : title["attr.BuildingClassification"];

  const location = title["attr.Location"];

  const mapValue = useMemo(() => {
    // If location is not a valid coordinate string, do not render the map.
    if (!isCoordinates(location)) return null;

    // Feature collection will contain 1 or more Features (Point or Polygon).
    return {
      type: "FeatureCollection",
      features: deserializeFeatures(location)
    } as FeatureCollection;
  }, [location]);

  const showMap = !!mapValue;

  return (
    <>
      <Banner withMap={showMap}>
        <Image src={getImageSrc(title.image)} />
        {showMap && (
          <Map defaultZoom={18} showGeocoder={false} value={mapValue} />
        )}
      </Banner>
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
            <BurnForm tokenId={title.tokenId} titleName={title.name} />
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
            {!!title.image && title.image.startsWith("ipfs") && (
              <tr>
                <td>Pinned Image</td>
                <td>{title.image}</td>
              </tr>
            )}
            <tr>
              <td>Land Classification</td>
              <td>{landClassificationLabel}</td>
            </tr>
            <tr>
              <td>Building Classification</td>
              <td>{buildingClassificationLabel}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{location.replace(/,/g, ", ")}</td>
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
    </>
  );
};

const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const tokenId = query.tokenId as string;
  const network = query.network as string;
  const index = algolia.initIndex(`titles-${network}`);

  const chainConfig = getChainConfigByInternalId(network);
  if (!chainConfig) return { notFound: true };
  const contract = new TitleContract(chainConfig?.chain.id as number);

  try {
    const ownerAddress = await contract.getOwner(parseInt(tokenId));
    const hit = await index.getObject(tokenId);

    return {
      props: {
        title: hit,
        explorer: chainConfig?.explorer,
        contractAddress: chainConfig?.contract.address,
        ownerAddress
      }
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default TitlePage;
export { getServerSideProps };
