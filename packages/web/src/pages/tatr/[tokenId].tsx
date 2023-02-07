// Types
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { v230203TaterMetadataSchema } from "@T/TATR";
import type { FeatureCollection } from "geojson";

// Services
import admin from "@services/Firebase/admin";
import { METADATA_COLLECTION_ID } from "@services/Firebase";

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

  const kmlValue = title.metadata.attributes.find(
    (attr) => attr.trait_type === "KML"
  )?.value;

  const deedURL = makeURL(deedValue);
  const kmlURL = makeURL(kmlValue);

  //
  //
  // CLASSIFICATIONS
  //
  //

  const landClassificationValue = title.metadata.attributes.find(
    (attr) => attr.trait_type === "Land Classification"
  )?.value as string;

  const landClassification = useMemo(
    () => getLandClassificationFromValue(landClassificationValue as string),
    []
  );

  const landClassificationLabel = !!landClassification
    ? classificationLabel(landClassification)
    : landClassificationValue;

  const buildingClassificationValue = title.metadata.attributes.find(
    (attr) => attr.trait_type === "Building Classification"
  )?.value as string;

  const buildingClassification = useMemo(
    () =>
      getBuildingClassificationFromValue(buildingClassificationValue as string),
    []
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

  return (
    <>
      <Banner withMap={showMap}>
        <Image src={getImageSrc(title.metadata.image)} alt="TATR Main Image" />
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
      <ChainData metadataId={title.id} creatorAddress={title.createdBy} />
      <Divider />
      <Row>
        <h2>Attributes</h2>
        <Attributes>
          <tbody>
            {!!title.metadata.image && title.metadata.image.startsWith("ipfs") && (
              <tr>
                <td>Pinned Image</td>
                <td>{title.metadata.image}</td>
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
                {kmlURL ? (
                  <a href={kmlValue} target="_blank" rel="noreferrer">
                    View KML
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
  const doc = await db.collection(METADATA_COLLECTION_ID).doc(tokenId).get();

  if (!doc.exists) return { notFound: true };

  const data = doc.data() as {
    metadata: v230203TaterMetadataSchema;
    createdBy: string;
  };

  return {
    props: {
      title: {
        id: tokenId,
        metadata: data.metadata,
        createdBy: data.createdBy,
        //@ts-expect-error
        createdAt: doc.createTime.toDate().toLocaleString()
      }
    }
  };
};

export default TitlePage;
