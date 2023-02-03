export enum MetadataSchemaVersions {
  v230203 = "230203"
}

interface ERC721MetadataSchema {
  name: string;
  description: string;
  image: string;
  external_url: string;
}

interface OpenseaMetadataSchema extends ERC721MetadataSchema {
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

interface TaterMetadataSchema extends OpenseaMetadataSchema {
  schemaVersion: MetadataSchemaVersions;
  metadataImmutabilitySignature?: string;
}

export interface v230203TaterMetadataSchema extends TaterMetadataSchema {
  attributes: [
    {
      trait_type: "Land Classification";
      value: string;
    },
    {
      trait_type: "Building Classification";
      value: string;
    },
    {
      trait_type: "Location";
      value: string;
    },
    {
      trait_type: "Deed";
      value: string;
    },
    {
      trait_type: "Parcels";
      value: string;
    },
    {
      trait_type: "Owner";
      value: string;
    },
    {
      trait_type: "KML";
      value: string;
    },
    {
      trait_type: "Tags";
      value: string;
    }
  ];
  schemaVersion: MetadataSchemaVersions.v230203;
}
