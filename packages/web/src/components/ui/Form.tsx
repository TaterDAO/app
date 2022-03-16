import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const FieldLabel = styled.h3`
  padding-bottom: 0.5rem;
`;

const FieldSecondaryLabel = styled.div`
  color: var(--color-brand-pink);
  font-size: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
`;

export { Container, Row, FieldLabel, FieldSecondaryLabel };
