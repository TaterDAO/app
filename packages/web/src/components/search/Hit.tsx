// Types
import type { Hit as T_Hit } from "@T/Search";

// Components
import NextLink from "next/link";
import Link from "@components/ui/Link";
import ProfileLink from "@components/ProfileLink";
import Tags from "@components/ui/Tags";

// Libs
import styled from "styled-components";
import {
  getLandClassificationFromValue,
  classificationLabel
} from "@libs/TitleClassifications";
import { isCoordinates } from "@libs/TitleLocation";

// Hooks
import useWeb3 from "@hooks/useWeb3";

import { getImageSrc } from "@utils/image";

const Container = styled.div`
  margin-top: var(--global-space-y-margin);
  border: 1px solid var(--global-color-border);
  border-radius: var(--global-border-radius);
  padding: var(--global-space-y-margin);

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h5 {
    padding-top: 0.25rem;
  }
`;

const Image = styled.img`
  width: 125px;
  height: 125px;
  object-fit: cover;
  background: var(--global-color-bg-disabled);
  margin: 0 auto var(--global-space-y-margin) auto;
  border: 1px solid transparent;
  border-radius: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Meta = styled.div``;

const Name = styled.h3`
  text-align: center;
  margin-bottom: calc(var(--global-space-y-margin) / 3);
  cursor: pointer;
`;

const Hit: React.FC<{ data: T_Hit }> = ({ data }) => {
  const web3 = useWeb3();

  //# Render

  const endpoint = `/title/${web3.network.internalId}/${data.objectID}`;

  const landClassification = getLandClassificationFromValue(
    data["attr.LandClassification"]
  );
  const landClassificationLabel = !!landClassification
    ? classificationLabel(landClassification)
    : data["attr.LandClassification"];

  const location = data["attr.Location"] as string;

  const tags = [
    `Classification: ${landClassificationLabel}`,
    isCoordinates(location) ? null : `Location: ${location}`,
    `Parcels: ${data["attr.Parcels"]}`
  ].filter((v) => !!v);

  return (
    <Container>
      <NextLink href={endpoint}>
        <Image src={getImageSrc(data.image)} />
      </NextLink>
      <Meta>
        <NextLink href={endpoint}>
          <Name>{data.name}</Name>
        </NextLink>
        <h5>
          Created by <ProfileLink address={data.owner} />
        </h5>
      </Meta>
      {<Tags data={tags} tokenId={data.objectID} id="tags" />}
    </Container>
  );
};

export default Hit;
