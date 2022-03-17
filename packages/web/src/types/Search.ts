type Hit = {
  objectID: string;
  tokenId: number;
  owner: string;
  name: string;
  description: string;
  externalUrl: string;
  image: string;
  "attr.LandClassification": string;
  "attr.Location": string;
  "attr.Deed": string;
  "attr.Parcels": string;
  "attr.Owner": string;
  "attr.Kml": string;
  "attr.Tag": string;
  "attr.CreatedDate": number;
  "attr.MaxSupply": number;
};

enum IndexedFields {
  Name = "name",
  Description = "description",
  LandClassification = "attrLandClassification",
  Location = "attrLocation",
  Deed = "attrDeed",
  Parcels = "attrParcels",
  Owner = "attrOwner",
  Tag = "attrOwner",
  CreatedAt = "attrCreatedAt"
}

interface Filters {
  [IndexedFields.Owner]: Array<string>;
}

export { IndexedFields };
export type { Hit, Filters };
