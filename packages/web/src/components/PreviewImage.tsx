// Types
import type { Image } from "@T/Image";
import { ImageSrcType } from "@T/Image";

// Components
import { default as NextImage } from "next/image";

// Libs
import styled from "styled-components";

const MAX_HEIGHT = 350;
const QUALITY = 30;

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
  background-color: var(--color-mostly-black);
`;

const PreviewImage: React.FC<{
  data: Image;
}> = ({ data }) => {
  // Scale image down to height to maxHeight
  const scalar = data.height / MAX_HEIGHT;

  const src =
    data.type === ImageSrcType.Blob
      ? URL.createObjectURL(data.src as File)
      : (data.src as string);

  return (
    <Wrapper>
      <NextImage
        src={src}
        height={MAX_HEIGHT}
        width={data.width / scalar}
        layout="intrinsic"
        quality={QUALITY}
      />
    </Wrapper>
  );
};

export default PreviewImage;
