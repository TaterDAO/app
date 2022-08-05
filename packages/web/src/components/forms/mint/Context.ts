import { createContext } from "react";
import type { GenericFormState } from "../types";
import Joi from "joi";

const defaultState = {
  submitting: false,
  images: {
    image_: null
  },
  values: {
    name_: "",
    description_: "",
    externalUrl_: "",
    attrLandClassification_: "",
    attrBuildingClassification_: "",
    attrLocation_: "",
    attrDeed_: "",
    attrParcels_: "",
    attrOwner_: "",
    attrKml_: "",
    attrTag_: ""
  } as GenericFormState["values"],
  requiredFields: [
    "name_",
    "description_",
    "attrLandClassification_",
    "attrBuildingClassification_",
    "attrLocation_",
    "attrParcels_"
  ],
  validationSchema: Joi.object({
    name_: Joi.string(),
    description_: Joi.string(),
    externalUrl_: Joi.string().allow("").uri(),
    attrLandClassification_: Joi.string(),
    attrBuildingClassification_: Joi.string(),
    attrLocation_: Joi.string(),
    attrDeed_: Joi.string().allow("").uri(),
    attrParcels_: Joi.string(),
    attrOwner_: Joi.string().allow(""),
    attrKml_: Joi.string().allow("").uri(),
    attrTag_: Joi.string().allow("")
  }),
  errors: {}
};

//@ts-ignore
const MintFormContext = createContext(defaultState as GenericFormState);
MintFormContext.displayName = "MintFormContext";

export default MintFormContext;
export { defaultState };
