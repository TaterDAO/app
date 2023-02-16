import { createContext } from "react";
import type { MintFormContext } from "@T/Form";
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
    attrDeed_: "",
    attrParcels_: "",
    attrOwner_: "",
    attrTag_: ""
  } as MintFormContext["values"],
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
    // Must be FeatureCollection or Point
    attrLocation_: Joi.custom((value, helper) => {
      if (!value) return false;
      if (!value.hasOwnProperty("type")) return false;
      if (value.type === "Point") {
        if (!value.hasOwnProperty("coordinates")) return false;
        // Only check that length is correct
        // TODO: Parse that lng,lat coord pair
        return value.coordinates.length == 2;
      } else if (value.type === "FeatureCollection") {
        if (!value.hasOwnProperty("features")) return false;
        // On check that features are present
        // TODO: Parse that valid GeoJson features
        return value.features.length > 0;
      } else {
        return false;
      }
    }),
    attrDeed_: Joi.string().allow("").uri(),
    attrParcels_: Joi.string(),
    attrOwner_: Joi.string().allow(""),
    attrKml_: Joi.string().allow("").uri(),
    attrTag_: Joi.string().allow("")
  })
};

//@ts-ignore
const MintFormContext = createContext(defaultState as MintFormContext);
MintFormContext.displayName = "MintFormContext";

export default MintFormContext;
export { defaultState };
