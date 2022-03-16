import styled from "styled-components";

const Input = styled.input<{ invalid?: boolean }>`
  border: 1px solid
    ${({ invalid }) =>
      invalid ? "var(--color-brand-pink)" : "var(--color-accent-gray)"};
  padding: 1rem 2rem;
  border-radius: 0.25rem;
`;

Input.defaultProps = {
  invalid: false
};

export default Input;
