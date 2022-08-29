import styled from "styled-components";
import { SunLight } from "iconoir-react";
import NextImage from "next/image";

const Container = styled.div`
  width: 100%;
  height: 400px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--global-color-bg-disabled);

  margin-bottom: calc(var(--global-space-y-margin) * 2);
  position: relative;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  svg {
    animation: rotate 4s linear infinite;
  }
`;

const Image: React.FC<{ src: string; loading?: boolean }> = ({
  src,
  loading = false
}) => {
  return (
    <Container>
      {loading ? (
        <SunLight fontSize={60} color="var(--color-pale-yellow)" />
      ) : (
        <NextImage
          src={src}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      )}
    </Container>
  );
};

export default Image;
