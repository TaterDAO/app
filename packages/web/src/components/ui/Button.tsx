import styled from "styled-components";

const Button = styled.button<{ big?: boolean }>`
  border-radius: var(--global-border-radius);

  background-color: transparent;
  border: 1px solid;
  color: var(--global-color-brand);

  padding: ${({ big }) => (big ? "1rem 2rem" : "0.5rem 1rem")};

  font-weight: 600;
  font-size: ${({ big }) => (big ? "1.05rem" : "0.9rem")};
  font-family: inherit;

  &:hover {
    opacity: 0.8;
    transition: opacity ease 0.2s;
  }

  &:disabled {
    filter: grayscale(1);
    opacity: 0.15;
    cursor: default;
  }

  a {
    color: inherit;
    background-color: transparent;
    text-decoration: none;
  }
`;

Button.defaultProps = {
  big: false
};

export default Button;
