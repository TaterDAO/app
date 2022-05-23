interface Image {
  src: string | File;
  name?: string;
  height: number;
  width: number;
  createdAt?: number;
  id?: string;
  blurDataURL: string;
}

export type { Image };
