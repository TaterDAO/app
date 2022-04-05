// Libs
import styled from "styled-components";

// Components
import NextLink from "next/link";

// Hooks
import { useRouter } from "next/router";

const A = styled.a`
  border-bottom: 1px dotted;
`;

const NoRedirectionLink = styled(A)`
  border-bottom: none;
  cursor: default;
`;

const Link: React.FC<{ children: string; href: string }> = ({
  children,
  href
}) => {
  const router = useRouter();

  return router.route == href ? (
    <NoRedirectionLink>{children}</NoRedirectionLink>
  ) : (
    <NextLink href={href} passHref>
      <A>{children}</A>
    </NextLink>
  );
};

export default Link;
