import Joi from "joi";
import type { Image } from "@T/Image";

type FieldStrMap = { [fieldId: string]: string };

interface GenericFormState {
  submitting: boolean;
  values: FieldStrMap;
  images: { [fieldId: string]: Image | null };
  requiredFields: Array<string>;
  validationSchema: Joi.ObjectSchema<any>;
  setValue: (fieldId: string, value: string) => void;
  setImage: (fieldId: string, value: Image | null) => void;
  submit: () => Promise<void>;
  errors: FieldStrMap;
  validateField: (fieldId: string, value?: string) => boolean;
}

export type { GenericFormState };
