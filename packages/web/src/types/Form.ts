import Joi from "joi";
import type { Image } from "@T/Image";
import type { FeatureCollection, Point } from "geojson";

import type { State, Action } from "@contexts/mint/types";

interface Option {
  value: string;
  label: string;
  description: string;
  subOptions?: Array<Option>;
}

interface ParentLinkedOption extends Option {
  parent: Option | null;
}

export interface MintFormFields extends Record<string, string> {
  name_: string;
  description_: string;
  externalUrl_: string;
  attrLandClassification_: string;
  attrBuildingClassification_: string;
  attrDeed_: string;
  attrParcels_: string;
  attrOwner_: string;
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

interface MintFormErrorsByField extends Record<string, string> {
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
  // TODO:
  // Mixing Mint-form specific type declarations into the GenericFormState
  // makes it non-generic... this should be rectified & Generic Form more generally
  // deprecated.
  dispatch: React.Dispatch<Action>;
  state: State;
}

export type { Option, ParentLinkedOption, GenericFormState };
