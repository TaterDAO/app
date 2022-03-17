import styled from "styled-components";

const Button = styled.button<{ primary?: boolean; big?: boolean }>`
  border: 0;
  border-radius: 0.25rem;

  background-color: ${({ primary }) =>
    primary ? "var(--color-brand-blue-d)" : "var(--color-brand-black)"};
  color: white;

  padding: ${({ big }) => (big ? "1rem 2rem" : "0.25rem 0.75rem")};

  font-weight: 600;
  font-size: ${({ big }) => (big ? "1.05rem" : "0.9rem")};

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
  primary: false,
  big: false
};

export default Button;
