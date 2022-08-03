import styled from "styled-components";
import { ButtonSC } from "./Button";

const Container = styled.div``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  margin-bottom: 1rem;

  ${ButtonSC} {
    margin-left: auto;
  }
`;

const FieldMeta = styled.div`
  width: 200px;
  margin-right: var(--global-space-x-margin);
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
`;

const FieldLabel = styled.strong``;

const FieldSecondaryLabel = styled.div`
  color: var(--global-color-font-secondary);
  font-weight: 600;
`;

const FieldDescription = styled.small`
  margin-top: calc(var(--global-space-y-margin) / 3);
  line-height: 2;
  color: var(--color-silver);
`;

const Input = styled.input<{ invalid?: boolean }>`
  border: 1px solid
    ${({ invalid }) =>
      invalid ? "var(--global-color-error)" : "var(--global-color-border)"};
  padding: 1rem 2rem;
  border-radius: var(--global-border-radius);

  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: 1rem;

  flex-grow: 1;

  ::placeholder {
    color: var(--global-color-font);
  }

  transition: var(--global-transition);

  &:hover {
    border-color: var(--global-color-border-hover);
  }

  &:focus {
    outline: 0;
    border-color: var(--global-color-border-focused);
  }

  &:disabled {
    background-color: var(--global-color-bg-disabled);
    border-color: transparent;
    cursor: default;
  }
`;

Input.defaultProps = {
  invalid: false
};

const FileInput = styled(Input).attrs({ type: "file" })`
  text-align: center;
  &::file-selector-button {
    border-radius: var(--global-border-radius);
    background-color: var(--color-bright-indigo);
    border: 1px solid var(--color-bright-indigo);
    color: var(--global-color-font);
    padding: 0.75rem 1.25rem;

    font-weight: 600;
    font-size: 0.9rem;
    font-family: inherit;

    cursor: pointer;
  }
`;

export {
  Container,
  Row,
  FieldMeta,
  FieldLabel,
  FieldSecondaryLabel,
  Input,
  FileInput,
  FieldDescription
};
