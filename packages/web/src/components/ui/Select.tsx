import styled from "styled-components";

const Container = styled.div`
  border: 1px solid var(--color-accent-gray);
  padding: 1rem 2rem;
  border-radius: 0.25rem;

  :after {
    content: "";
    position: absolute;
    top: 20px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #000;
    clear: both;
  }

  position: relative;
  max-width: 300px;
`;

const El = styled.select`
  border: 0;
  width: 100%;
  appearance: none;

  ::placeholder {
    color: var(--color-gray);
  }
`;

const Select: React.FC<{
  children: Array<React.ReactNode>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ children, onChange, value }) => {
  return (
    <Container>
      <El onChange={onChange} value={value}>
        {children}
      </El>
    </Container>
  );
};

export default Select;
