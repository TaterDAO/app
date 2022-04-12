// Components
import Link from "next/link";

// Libs
import styled from "styled-components";

const El = styled.h1`
  font-size: 1.25rem;
  cursor: pointer;
  font-family: inherit;
`;

const Wordmark = () => {
  return (
    <Link href="/" passHref>
      <El>TaterDAO</El>
    </Link>
  );
};

export default Wordmark;
