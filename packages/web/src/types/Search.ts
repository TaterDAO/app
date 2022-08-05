type Hit = {
  objectID: string;
  tokenId: number;
  owner: string;
  name: string;
  description: string;
  externalUrl?: string;
  image?: string;
  "attr.LandClassification": string;
  "attr.Location": string;
  "attr.Deed"?: string;
  "attr.Parcels": string;
  "attr.Owner"?: string;
  "attr.Kml"?: string;
  "attr.Tag"?: string;
  "attr.CreatedDate": number;
  "attr.MaxSupply": number;
  "attr.BuildingClassification": string;
};

enum IndexedFields {
  Name = "name",
  Description = "description",
  Owner = "owner",
  BuildingClassification = "attr.BuildingClassification",
  LandClassification = "attr.LandClassification",
  Location = "attr.Location",
  Deed = "attr.Deed",
  Parcels = "attr.Parcels",
  Tag = "attr.Tag",
  AttrOwner = "attr.Owner",
  CreatedAt = "attr.CreatedAt"
}

interface Filters {
  [IndexedFields.Owner]: Array<string>;
}

export { IndexedFields };
export type { Hit, Filters };
