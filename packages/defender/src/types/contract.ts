type RawMetadata = {
  tokenId: string;
  owner: string;
  name: string;
  description: string;
  external_url: string;
  image: string;
  attributes: Array<{ value: string }>;
};

export type { RawMetadata };
