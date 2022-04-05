// Types
import type { Hit as T_Hit } from "@T/Search";

// Components
import Link from "@components/ui/Link";
import ProfileLink from "@components/ProfileLink";

// Libs
import styled from "styled-components";

const Container = styled.div`
  margin-top: 1rem;

  h5 {
    padding-top: 0.25rem;
  }
`;

const Hit: React.FC<{ data: T_Hit }> = ({ data }) => {
  return (
    <Container>
      <Link href={`/title/${data.objectID}`}>{data.name}</Link>
      <h5>
        Created by <ProfileLink address={data.owner} />
      </h5>
    </Container>
  );
};

export default Hit;
