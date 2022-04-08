import styled from "styled-components";
import Button from "./Button";

const Container = styled.div``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  margin-bottom: 1rem;

  ${Button} {
    margin-left: auto;
  }
`;

const FieldLabel = styled.h3`
  padding-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const FieldSecondaryLabel = styled.div`
  color: var(--color-bright-yellow);
  font-size: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
`;

const FieldMeta = styled.div`
  width: 200px;
  margin-right: 2rem;
`;

const Input = styled.input<{ invalid?: boolean }>`
  border: 1px solid
    ${({ invalid }) =>
      invalid ? "var(--color-bright-red)" : "var(--color-indigo)"};
  padding: 1rem 2rem;
  border-radius: 0.25rem;

  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: 1rem;

  flex-grow: 1;

  ::placeholder {
    color: var(--color-yellow);
  }
`;

Input.defaultProps = {
  invalid: false
};

export { Container, Row, FieldMeta, FieldLabel, FieldSecondaryLabel, Input };
