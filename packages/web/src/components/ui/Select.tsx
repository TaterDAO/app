import styled from "styled-components";

const Container = styled.div<{ disabled: boolean }>`
  border: 1px solid var(--color-indigo);
  padding: 1rem 2rem;
  border-radius: 0.25rem;

  :after {
    content: "";
    position: absolute;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--color-indigo);
    clear: both;
  }

  position: relative;
  max-width: 300px;
  display: flex;
  align-items: center;

  opacity: ${({ disabled }) => (disabled ? 0.25 : 1)};
`;

const El = styled.select`
  border: 0;
  width: 100%;
  appearance: none;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: 1rem;

  ::placeholder {
    color: var(--color-yellow);
  }

  option {
    background-color: var(--global-color-bg);
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
