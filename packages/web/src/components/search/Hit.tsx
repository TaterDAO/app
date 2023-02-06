// Types
import type { v230203TaterMetadataSchema } from "@T/TATR";

// Components
import NextLink from "next/link";
import ProfileLink from "@components/ProfileLink";
import Tags from "@components/ui/Tags";
import Image from "next/image";

// Libs
import styled from "styled-components";
import {
  getLandClassificationFromValue,
  classificationLabel
} from "@libs/TitleClassifications";
import { isCoordinates, isPolygon } from "@libs/TitleLocation";

import { getImageSrc } from "@utils/image";

const Container = styled.div`
  margin-top: var(--global-space-y-margin);
  border: 1px solid var(--global-color-border);
  border-radius: var(--global-border-radius);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background-color: var(--global-color-bg);

  h5 {
    padding-top: 0.25rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
`;

const Content = styled.div`
  padding: var(--global-space-y-margin);
`;

const Meta = styled.div``;

const Name = styled.h3`
  text-align: center;
  margin-bottom: calc(var(--global-space-y-margin) / 3);
  cursor: pointer;
`;

const Hit: React.FC<{ id: string; metadata: v230203TaterMetadataSchema }> = ({
  id,
  metadata
}) => {
  //# Render

  const endpoint = `/tatr/${id}`;

  const landClassificationValue = metadata.attributes.find(
    (attr) => attr.trait_type === "Land Classification"
  )?.value as string;

  const landClassification = getLandClassificationFromValue(
    landClassificationValue
  );

  const landClassificationLabel = !!landClassification
    ? classificationLabel(landClassification)
    : landClassificationValue;

  const location = metadata.attributes.find(
    (attr) => attr.trait_type === "Location"
  )?.value as string;

  const tags = [
    `Classification: ${landClassificationLabel}`,
    isCoordinates(location) && isPolygon(location)
      ? null
      : `Location: ${location}`,
    `Parcels: ${
      metadata.attributes.find((attr) => attr.trait_type === "Parcels")?.value
    }`
  ].filter((v) => !!v);

  return (
    <Container>
      <NextLink href={endpoint}>
        <ImageWrapper>
          <Image
            src={getImageSrc(metadata.image)}
            fill
            style={{ objectFit: "cover" }}
            alt={`Image of ${metadata.name}`}
          />
        </ImageWrapper>
      </NextLink>
      <Content>
        <Meta>
          <NextLink href={endpoint}>
            <Name>{metadata.name}</Name>
          </NextLink>
        </Meta>
        {<Tags data={tags} tokenId={id} id="tags" />}
      </Content>
    </Container>
  );
};

export default Hit;
