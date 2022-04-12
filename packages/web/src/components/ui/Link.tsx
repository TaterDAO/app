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

const Link: React.FC<{ children: string; href: string }> = ({
  children,
  href
}) => {
  const router = useRouter();

  return router.route == href ? (
    <NoRedirectionLink>{children}</NoRedirectionLink>
  ) : (
    <NextLink href={href} passHref>
      <a>{children}</a>
    </NextLink>
  );
};

export default Link;
