import styled from "styled-components";

const Container = styled.div``;

const Tag = styled.div`
  color: var(--global-color-font-secondary);
  font-size: 0.9rem;
  margin: calc(var(--global-space-y-margin) / 3) 0;
`;

const Tags = ({
  data,
  tokenId,
  id
}: {
  data: Array<string | null>;
  tokenId: string;
  id: string;
}) => {
  return (
    <Container>
      {data
        .filter((tag) => tag)
        .map((tag) => (
          <Tag key={`${tokenId}-${id}-${tag}`}>{tag}</Tag>
        ))}
    </Container>
  );
};

export default Tags;
