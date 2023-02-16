import styled, { css } from "styled-components";
import { ButtonSC } from "./Button";
import { ArrowDownCircled } from "iconoir-react";

const Container = styled.div``;

const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 0 2rem 0;
  row-gap: 1rem;
  margin-bottom: 1rem;

  ${ButtonSC} {
    margin-left: auto;
  }
`;

const placeholderCSS = css`
  color: rgba(var(--global-color-font-rgb), 0.5);
  opacity: 1;
`;

const inputCSS = css<{ invalid?: boolean }>`
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
  height: fit-content;
  max-width: 650;

  &::placeholder {
    ${placeholderCSS}
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

const Input = styled.input<{ invalid?: boolean }>`
  ${inputCSS}
`;

Input.defaultProps = {
  invalid: false
};

const SelectWrapper = styled.span`
  position: relative;
  flex-grow: 1;
  height: fit-content;
  max-width: 700px;

  &:hover {
    svg {
      color: var(--global-color-border-hover);
    }
  }

  svg {
    transition: var(--global-transition);
    position: absolute;
    right: var(--global-space-x-margin);
    top: 0;
    bottom: 0;
    height: 100%;
    color: var(--global-color-border);
  }
`;

const SelectSC = styled.select<{ placeholderSelected: boolean }>`
  ${inputCSS};
  appearance: none;
  width: 100%;

  ${({ placeholderSelected }) => placeholderSelected && placeholderCSS}
`;

const Select: React.FC<any> = (props) => {
  return (
    <SelectWrapper>
      <SelectSC {...props} />
      <ArrowDownCircled />
    </SelectWrapper>
  );
};

const FileInput = styled(Input).attrs({ type: "file" })`
  &::file-selector-button {
    border-radius: var(--global-border-radius);
    background-color: var(--global-color-attention);
    border: 1px solid var(--global-color-attention);
    color: var(--global-color-font);
    padding: 0.75rem 1.25rem;
    margin-right: 1rem;

    font-weight: 600;
    font-size: 0.9rem;
    font-family: inherit;

    cursor: pointer;
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ErrorMessage = styled.div`
  position: absolute;
  right: 0;
  top: calc(var(--global-space-y-margin) / -4);

  text-align: center;

  color: var(--global-color-error);
  font-weight: 600;
  font-size: 0.9rem;
`;

export { Container, Row, Input, FileInput, ErrorMessage, Select };
