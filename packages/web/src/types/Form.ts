import Joi from "joi";
import type { Image } from "@T/Image";

interface Option {
  value: string;
  label: string;
  description: string;
  subOptions?: Array<Option>;
}

interface ParentLinkedOption extends Option {
  parent: Option | null;
}

type FieldStrMap = { [fieldId: string]: string };

interface GenericFormState {
  submitting: boolean;
  values: FieldStrMap;
  images: { [fieldId: string]: Image | null };
  requiredFields: Array<string>;
  validationSchema: Joi.ObjectSchema<any>;
  setValue: (fieldId: string, value: string) => void;
  setImage: (fieldId: string, value: Image | null) => void;
  setSubmitting: (bool: boolean) => void;
  submit: () => Promise<void>;
  errors: FieldStrMap;
  validateField: (fieldId: string, value?: string) => boolean;
}

export type { Option, ParentLinkedOption, FieldStrMap, GenericFormState };
