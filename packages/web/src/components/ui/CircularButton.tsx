import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const Wrapper = styled.div<{ active: boolean }>`
  height: 44px;
  width: 44px;
  border: 1px solid;
  border-color: var(
    ${({ active }) =>
      active ? "--global-color-border-focused" : "--global-color-border"}
  );
  border-radius: 100%;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: var(--global-transition);

  &:hover {
    border-color: var(
      ${({ active }) =>
        active
          ? "--global-color-border-focused"
          : "--global-color-border-hover"}
    );
  }
`;

type Props = {
  children: JSX.Element;
  href: string;
};

const CircularButton = ({ children, href }: Props) => {
  const router = useRouter();
  return (
    <Link href={href} passHref>
      <Wrapper active={href === router.pathname}>{children}</Wrapper>
    </Link>
  );
};

export default CircularButton;
