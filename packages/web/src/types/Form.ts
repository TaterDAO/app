import Joi from "joi";
import type { Image } from "@T/Image";
import type { FeatureCollection, Point } from "geojson";

interface Option {
  value: string;
  label: string;
  description: string;
  subOptions?: Array<Option>;
}

interface ParentLinkedOption extends Option {
  parent: Option | null;
}

export interface MintFormFields {
  [fieldId: string]: any;
  name_: string;
  description_: string;
  externalUrl_: string;
  attrLandClassification_: string;
  attrBuildingClassification_: string;
  attrLocation_: FeatureCollection | Point | undefined;
  attrDeed_: string;
  attrParcels_: string;
  attrOwner_: string;
  attrKml_: string;
  attrTag_: string;
}

export interface SerializedMintFormFields {
  name_: string;
  description_: string;
  externalUrl_: string;
  image_: string;
  attrLandClassification_: string;
  attrBuildingClassification_: string;
  attrLocation_: string;
  attrDeed_: string;
  attrParcels_: string;
  attrOwner_: string;
  attrKml_: string;
  attrTag_: string;
}

type MintFormErrorsByField = {
  [fieldId: string]: string;
  name_: string;
  description_: string;
  externalUrl_: string;
  image_: string;
  attrLandClassification_: string;
  attrBuildingClassification_: string;
  attrLocation_: string;
  attrDeed_: string;
  attrParcels_: string;
  attrOwner_: string;
  attrKml_: string;
  attrTag_: string;
};

interface GenericFormState {
  submitting: boolean;
  values: MintFormFields;
  images: { [fieldId: string]: Image | null };
  requiredFields: Array<string>;
  validationSchema: Joi.ObjectSchema<any>;
  setValue: (fieldId: string, value: any) => void;
  setImage: (fieldId: string, value: Image | null) => void;
  setSubmitting: (bool: boolean) => void;
  submit: () => Promise<void>;
  errors: MintFormErrorsByField;
  validateField: (fieldId: string, value?: any) => boolean;
}

export type { Option, ParentLinkedOption, GenericFormState };
