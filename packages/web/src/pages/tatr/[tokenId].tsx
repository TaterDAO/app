// Types
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { v230203TaterMetadataSchema } from "@T/TATR";
import type { FeatureCollection } from "geojson";

// Services
import admin from "@services/Firebase/admin";
import {
  METADATA_COLLECTION_ID,
  TOKENS_COLLECTION_ID
} from "@services/Firebase";
import { cidToURL } from "@services/IPFS";

// Libs
import {
  getLandClassificationFromValue,
  getBuildingClassificationFromValue,
  classificationLabel
} from "@libs/TitleClassifications";
import { isCoordinates, deserializeFeatures } from "@libs/TitleLocation";

// Components
import Button from "@components/ui/Button";
import Divider from "@components/ui/Divider";
import Image from "@components/title/Image";
import Map from "@components/Map";

// Don't SSR on-chain data
import dynamic from "next/dynamic";
const ChainData = dynamic(() => import("@components/title/ChainData"), {
  ssr: false
});
const ProfileLink = dynamic(() => import("@components/ProfileLink"), {
  ssr: false
});

import {
  Name,
  Row,
  NamedProperty,
  Description,
  Attributes,
  ActionButtons,
  Banner
} from "@components/title/UI";

// Utils
import { getImageSrc } from "@utils/image";
import { csr } from "@utils/browser";

// Hooks
import { useMemo } from "react";

function makeURL(attr: string | undefined): URL | null {
  try {
    return new URL(attr as string);
  } catch (error) {
    // Throws if not a valid URL
    return null;
  }
}

const TitlePage: NextPage<{
  title: {
    id: string;
    metadata: v230203TaterMetadataSchema;
    createdBy: string;
    createdAt: string;
    tokens: Array<{ chainId: number; tokenId: number; burnt: boolean }>;
  };
}> = ({ title }) => {
  //
  //
  // URLS
  //
  //

  const metadataUrl = csr()
    ? `${window.location.origin}/api/${window.location.pathname}`
    : "";

  const deedValue = title.metadata.attributes.find(
    (attr) => attr.trait_type === "Deed"
  )?.value;

  const kmlCID = title.metadata.attributes.find(
    (attr) => attr.trait_type === "KML"
  )?.value;

  const deedURL = makeURL(deedValue);

  //
  //
  // CLASSIFICATIONS
  //
  //

  const landClassificationValue = title.metadata.attributes.find(
    (attr) => attr.trait_type === "Land Classification"
  )?.value as string;

  const landClassification = getLandClassificationFromValue(
    landClassificationValue as string
  );

  const landClassificationLabel = !!landClassification
    ? classificationLabel(landClassification)
    : landClassificationValue;

  const buildingClassificationValue = title.metadata.attributes.find(
    (attr) => attr.trait_type === "Building Classification"
  )?.value as string;

  const buildingClassification = getBuildingClassificationFromValue(
    buildingClassificationValue as string
  );

  const buildingClassificationLabel = !!buildingClassification
    ? classificationLabel(buildingClassification)
    : buildingClassificationValue;

  //
  //
  // LOCATION
  //
  //

  const location = title.metadata.attributes.find(
    (attr) => attr.trait_type === "Location"
  )?.value;

  const mapValue = useMemo(() => {
    if (location) {
      // If location is not a valid coordinate string, do not render the map.
      if (!isCoordinates(location)) return null;

      // Feature collection will contain 1 or more Features (Point or Polygon).
      return {
        type: "FeatureCollection",
        features: deserializeFeatures(location)
      } as FeatureCollection;
    } else return null;
  }, [location]);

  const showMap = !!mapValue;

  //
  //
  // RENDER
  //
  //

  const hasExternalUrl = !!title.metadata.external_url;
  const imageSrc = getImageSrc(title.metadata.image);

  return (
    <>
      <Banner withMap={showMap}>
        <Image src={imageSrc} alt="TATR Main Image" />
        {showMap && (
          <Map
            defaultZoom={18}
            showGeocoder={false}
            value={mapValue}
            shouldRenderCenterBtn
          />
        )}
      </Banner>
      <Name>{title.metadata.name}</Name>
      <Description>{title.metadata.description}</Description>
      <ActionButtons>
        {hasExternalUrl && (
          <Button
            onClick={() => window.open(title.metadata.external_url, "_blank")}
          >
            View Website (External)
          </Button>
        )}
        <Button onClick={() => window.open(metadataUrl, "_blank")}>
          View Metadata
        </Button>
      </ActionButtons>
      <Divider />
      <NamedProperty>
        <span>Creator</span> <ProfileLink address={title.createdBy} />
      </NamedProperty>
      <ChainData
        metadataId={title.id}
        creatorAddress={title.createdBy}
        createdAt={title.createdAt}
        tokens={title.tokens}
      />
      <Divider />
      <Row>
        <h2>Attributes</h2>
        <Attributes>
          <tbody>
            {!!title.metadata.image && title.metadata.image.startsWith("ipfs") && (
              <tr>
                <td>Pinned Image</td>
                {!imageSrc.includes("placeholder") && (
                  <td>
                    <a
                      href={cidToURL(title.metadata.image).href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {title.metadata.image}
                    </a>
                  </td>
                )}
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
              <td>{location ? location.replace(/,/g, ", ") : ""}</td>
            </tr>
            <tr>
              <td>Deed</td>
              <td>
                {deedURL ? (
                  <a href={deedValue} target="_blank" rel="noreferrer">
                    View Deed
                  </a>
                ) : (
                  "None Provided"
                )}
              </td>
            </tr>
            <tr>
              <td>Parcels</td>
              <td>
                {title.metadata.attributes.find(
                  (attr) => attr.trait_type === "Parcels"
                )?.value || ""}
              </td>
            </tr>
            <tr>
              <td>Owner</td>
              <td>
                {title.metadata.attributes.find(
                  (attr) => attr.trait_type === "Owner"
                )?.value || ""}
              </td>
            </tr>
            <tr>
              <td>KML</td>
              <td>
                {kmlCID ? (
                  <a
                    href={`/api/kml/${kmlCID.replace("ipfs://", "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {kmlCID}
                  </a>
                ) : (
                  "None Provided"
                )}
              </td>
            </tr>
            <tr>
              <td>Tags</td>
              <td>
                {title.metadata.attributes.find(
                  (attr) => attr.trait_type === "Tags"
                )?.value || ""}
              </td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{title.createdAt}</td>
            </tr>
            <tr>
              <td>Authenticity Signature</td>
              <td>
                <code
                  style={{
                    wordWrap: "break-word",
                    display: "block",
                    maxWidth: 600
                  }}
                >
                  {title.id}
                </code>
              </td>
            </tr>
          </tbody>
        </Attributes>
      </Row>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const db = admin.firestore();
  const snapshot = await db.collection(METADATA_COLLECTION_ID).get();
  const paths = !snapshot.empty
    ? snapshot.docs.map((doc) => ({ params: { tokenId: doc.id } }))
    : [];
  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;

  const db = admin.firestore();
  const ref = db.collection(METADATA_COLLECTION_ID).doc(tokenId);
  const doc = await ref.get();

  if (!doc.exists) return { notFound: true };

  const data = doc.data() as {
    metadata: v230203TaterMetadataSchema;
    createdBy: string;
  };

  // Query tokens
  const tokensSnapshot = await db
    .collection(TOKENS_COLLECTION_ID)
    .where("metadata", "==", ref)
    .get();
  const tokens = tokensSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      chainId: data.chainId,
      tokenId: data.tokenId,
      burnt: data.burnt
    };
  });

  // If all tokens are burnt, do not render
  if (tokens.every((token) => token.burnt)) return { notFound: true };

  return {
    props: {
      title: {
        id: tokenId,
        metadata: data.metadata,
        createdBy: data.createdBy,
        createdAt: doc.createTime.toDate().toLocaleString(),
        tokens
      }
    },
    // Attempt to re-generate the page when a request comes in
    revalidate: 10 // in seconds
  };
};

export default TitlePage;
