import styled from "styled-components";
import { SunLight } from "iconoir-react";

const Container = styled.div`
  width: 100%;
  height: 400px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--global-color-bg-disabled);

  margin-bottom: calc(var(--global-space-y-margin) * 2);
`;

const El = styled(Container)<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  color: var(--global-color-font-secondary);
  font-style: italic;
  text-align: center;
  font-weight: 700;
`;

const Loading = styled(Container)`
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  svg {
    animation: rotate 4s linear infinite;
  }
`;

const Image: React.FC<{ src: string; loading: boolean }> = ({
  src,
  loading
}) => {
  return loading ? (
    <Loading>
      <SunLight fontSize={60} color="var(--color-pale-yellow)" />
    </Loading>
  ) : (
    <El src={src} />
  );
};

export default Image;
