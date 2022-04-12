import styled from "styled-components";

const Container = styled.div<{ disabled: boolean }>`
  border: 1px solid;
  padding: 0.75rem 1.25rem;
  border-radius: var(--global-border-radius);
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  :after {
    content: "";
    position: absolute;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--global-color-border);
    clear: both;
  }

  position: relative;
  max-width: 300px;
  display: flex;
  align-items: center;

  background-color: ${({ disabled }) =>
    disabled ? "var(--global-color-bg-disabled)" : "transparent"};
  border-color: ${({ disabled }) =>
    disabled ? "transparent" : "var(--global-color-border)"};
`;

const El = styled.select`
  border: 0;
  width: 100%;
  appearance: none;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;

  ::placeholder {
    color: var(--color-yellow);
  }

  option {
    background-color: var(--global-color-bg);
  }

  &:disabled {
    cursor: default;
    color: var(--global-color-font-secondary);
  }
`;

const Select: React.FC<{
  children: Array<React.ReactNode>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
}> = ({ children, onChange, value, disabled }) => {
  return (
    <Container disabled={disabled}>
      <El onChange={onChange} value={value} disabled={disabled}>
        {children}
      </El>
    </Container>
  );
};

Select.defaultProps = {
  disabled: false
};

export default Select;
