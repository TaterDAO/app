enum ImageSrcType {
  Blob = "blob",
  Remote = "remote"
}

interface Image {
  src: File | string;
  type: ImageSrcType;
  id: string;
  height: number;
  width: number;
}

export type { Image };
export { ImageSrcType };
