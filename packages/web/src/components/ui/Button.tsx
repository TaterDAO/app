import styled from "styled-components";

const Button = styled.button<{ primary?: boolean }>`
  border-radius: var(--global-border-radius);
  background-color: ${({ primary }) =>
    primary ? "var(--color-bright-indigo)" : "transparent"};
  border: 1px solid;
  border-color ${({ primary }) =>
    primary ? "var(--color-bright-indigo)" : "var(--global-color-border)"};
  color: var(--global-color-font);

  padding: 0.75rem 1.25rem;

  width: ${({ primary }) => (primary ? "100%" : "auto")};

  font-weight: 600;
  font-size: ${({ primary }) => (primary ? "1" : "0.9")}rem;
  font-family: inherit;

  transition: var(--global-transition);
  cursor: pointer;


  &:hover {
    border-color ${({ primary }) =>
      primary ? "transparent" : "var(--global-color-border-hover)"};
    background-color: ${({ primary }) =>
      primary ? "var(--color-indigo)" : "transparent"};
  }

  &:disabled {
    background-color: var(--global-color-bg-disabled);
    border-color: transparent;
    cursor: default;
    color: var(--global-color-font-secondary);
  }
`;

Button.defaultProps = {
  primary: false
};

export default Button;
