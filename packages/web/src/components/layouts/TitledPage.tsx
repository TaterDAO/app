import styled from "styled-components";

const Container = styled.div`
  header {
    margin-bottom: var(--global-space-y-margin);
  }
`;

type Props = {
  title: string;
  children: React.ReactNode | Array<React.ReactNode>;
};

const TitledPage = ({ title, children }: Props) => {
  return (
    <Container>
      <header>
        <h1>{title}</h1>
      </header>
      <div>{children}</div>
    </Container>
  );
};

export default TitledPage;
