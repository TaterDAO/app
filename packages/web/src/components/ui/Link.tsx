// Libs
import styled from "styled-components";

// Components
import NextLink from "next/link";

// Hooks
import { useRouter } from "next/router";

const NoRedirectionLink = styled.a`
  border-bottom: none;
  cursor: default;
`;

const StyledLink = styled(NextLink)`
  border-bottom: 1px dotted;
`;

const Link: React.FC<{ children: string; href: string }> = ({
  children,
  href
}) => {
  const router = useRouter();

  return router.route == href ? (
    <NoRedirectionLink>{children}</NoRedirectionLink>
  ) : (
    <StyledLink href={href} passHref>
      {children}
    </StyledLink>
  );
};

export default Link;
