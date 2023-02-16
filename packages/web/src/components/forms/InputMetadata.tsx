import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  padding-bottom: 1rem;
`;

const Name = styled.h2``;

const Required = styled.h3`
  color: var(--global-color-font-secondary);
  font-weight: 600;
`;

const Description = styled.div`
  font-size: 1.1rem;
  margin-top: calc(var(--global-space-y-margin) / 3);
  line-height: 2;
  color: var(--color-silver);
`;

const InputMeta: React.FC<{
  fieldId: string;
  label: string;
  description: string;
  required?: boolean;
}> = ({ fieldId, label, description, required = false }) => {
  return (
    <Container id={`form-input-metadata-${fieldId}`}>
      <Name>{label}</Name>
      {required && <Required>Required</Required>}
      <Description>{description}</Description>
    </Container>
  );
};

export default InputMeta;
