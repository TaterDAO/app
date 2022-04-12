// Components
import Link from "next/link";

// Libs
import styled from "styled-components";

const El = styled.h1`
  font-size: 2rem;
  cursor: pointer;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = () => {
  return (
    <Link href="/" passHref>
      <El>🥔</El>
    </Link>
  );
};

export default Logo;
