// Types
import type { Image } from "@T/Image";

// Components
import { default as NextImage } from "next/image";

// Libs
import styled from "styled-components";

const MAX_HEIGHT = 350;
const QUALITY = 30;

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  background-color: var(--color-mostly-black);
`;

const PreviewImage: React.FC<{
  data: Image;
}> = ({ data }) => {
  // Scale image down to height to maxHeight
  const scalar = data.height / MAX_HEIGHT;

  // Determine whether we're rendering a raw image blob or src
  const asFile = data.src as File;
  const src = !!asFile.name ? URL.createObjectURL(asFile) : data.src;

  return (
    <Wrapper>
      <NextImage
        src={src as string}
        height={MAX_HEIGHT}
        width={data.width / scalar}
        layout="intrinsic"
        quality={QUALITY}
      />
    </Wrapper>
  );
};

export default PreviewImage;
