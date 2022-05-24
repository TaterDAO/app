// Types
import type { Hit as T_Hit } from "@T/Search";

// Components
import NextLink from "next/link";
import Link from "@components/ui/Link";
import ProfileLink from "@components/ProfileLink";
import Tags from "@components/ui/Tags";

// Libs
import styled from "styled-components";

// Hooks
import useWeb3 from "@hooks/useWeb3";
import useIPFSImage from "@hooks/useIPFSImage";

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
  const ipfsImage = useIPFSImage(data.image as string);

  //# Render
  const imageSrc = ipfsImage.valid
    ? ipfsImage.data
    : data.image || "/images/placeholder.jpeg";

  const endpoint = `/title/${web3.network.internalId}/${data.objectID}`;
  return (
    <Container>
      <NextLink href={endpoint}>
        <Image src={imageSrc} alt={ipfsImage.loading ? "Loading..." : ""} />
      </NextLink>
      <Meta>
        <NextLink href={endpoint}>
          <Name>{data.name}</Name>
        </NextLink>
        <h5>
          Created by <ProfileLink address={data.owner} />
        </h5>
      </Meta>
      {data["attr.Tag"] && (
        <Tags
          data={[
            `Classification: ${data["attr.LandClassification"]}`,
            `Location: ${data["attr.Location"]}`,
            `Parcels: ${data["attr.Parcels"]}`
          ]}
          tokenId={data.objectID}
          id="tags"
        />
      )}
    </Container>
  );
};

export default Hit;
