import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const Tag = styled.div`
  border: 1px solid var(--color-silver);
  border-radius: var(--global-border-radius);
  font-size: 0.85rem;
  padding: 4px 8px;
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
