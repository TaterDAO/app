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

const Container = styled.div`
  margin-top: 3rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h5 {
    padding-top: 0.25rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  flex-grow: 1;
  object-fit: contain;
  background: var(--color-charcoal);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
`;

const Meta = styled.div`
  margin-top: auto;
`;

const Name = styled.h2`
  a {
    color: var(--global-color-font);
  }
`;

const Hit: React.FC<{ data: T_Hit }> = ({ data }) => {
  const web3 = useWeb3();
  const endpoint = `/title/${web3.network.name}/${data.objectID}`;
  return (
    <Container>
      <NextLink href={endpoint}>
        <Image src={data.image || "/images/placeholder.jpeg"} alt={data.name} />
      </NextLink>
      <Meta>
        <Name>
          <Link href={endpoint}>{data.name}</Link>
        </Name>
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
