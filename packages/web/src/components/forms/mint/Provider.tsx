import Context, { defaultState } from "./Context";

// Hooks
import React, { useReducer, useState } from "react";

// Types
import type { MintFormContext, SerializedMintFormFields } from "@T/Form";
import type { Image } from "@T/Image";
import type { Feature } from "geojson";
import type { FileMetadata } from "@services/IPFS";
import type { v230203TaterMetadataSchema } from "@T/TATR";
import { MetadataSchemaVersions } from "@T/TATR";

// Utils
import { escapeQuotes, escapeColons } from "@utils/form";
import { serializeFeatures } from "@libs/TitleLocation";

// Services
import * as ipfs from "@services/IPFS";

// Context
import reducer from "@contexts/mint/reducer";
import { DEFAULT_STATE } from "@contexts/mint/constants";

const domainFields = ["externalUrl_", "attrDeed_", "attrKml_"];

/**
 * Restructures schema in preparation for saving to Firestore.
 * @param payload Serialized form field values.
 * @returns Values conforming to v230203 metadata schema.
 */
function serializeMetadata(
  payload: SerializedMintFormFields
): v230203TaterMetadataSchema {
  return {
    name: payload.name_,
    description: payload.description_,
    image: payload.image_,
    external_url: payload.externalUrl_,
    attributes: [
      {
        trait_type: "Land Classification",
        value: payload.attrLandClassification_
      },
      {
        trait_type: "Building Classification",
        value: payload.attrBuildingClassification_
      },
      {
        trait_type: "Location",
        value: payload.attrLocation_
      },
      {
        trait_type: "Deed",
        value: payload.attrDeed_
      },
      {
        trait_type: "Parcels",
        value: payload.attrParcels_
      },
      {
        trait_type: "Owner",
        value: payload.attrOwner_
      },
      {
        trait_type: "KML",
        value: payload.attrKml_
      },
      {
        trait_type: "Tags",
        value: payload.attrTag_
      }
    ],
    schemaVersion: MetadataSchemaVersions.v230203
  };
}

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //
  //
  // STATE
  //
  //

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [validating, setValidating] = useState<boolean>(false);

  const [metadata, setMetadata] = useState<v230203TaterMetadataSchema>();

  const [values, setValues] = useState<MintFormContext["values"]>(
    defaultState.values
  );
  const [images, setImages] = useState<MintFormContext["images"]>(
    defaultState.images
  );
  const [errors, setError] = useState<Record<string, string>>({});

  //! WIP | Currently: KML & Location
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  //
  //
  // UI EFFECTS
  //
  //

  function scrollToError(fieldId: string) {
    (
      document.getElementById(
        //@ts-ignore
        `form-input-metadata-${fieldId}`
      ) as HTMLElement
    ).scrollIntoView({ block: "center", behavior: "smooth" });
  }

  //
  //
  // DATA VALIDATION
  //
  //

  /**
   * Validates that a given field's value is valid.
   * @param fieldId Field to validate
   * @param value Optional value to validate.  Useful if value has not yet been set to state.
   * @returns {boolean}
   */
  const validateField = (fieldId: string, value?: string): boolean => {
    const { error } = defaultState.validationSchema.validate({
      //@ts-ignore
      [fieldId]: value || values[fieldId]
    });
    if (!error) {
      setError((prevState) => {
        const newState = { ...prevState };
        delete newState[fieldId];
        return newState;
      });
      return true;
    }

    const message = (() => {
      switch (error.details[0].type) {
        case "string.empty":
          return "Value required";
        case "string.uri":
          return "Value must be a valid url and include http:// or https://`";
        default:
          return "Value is invalid";
      }
    })();

    setError((prevState) => ({
      ...prevState,
      [fieldId]: message
    }));

    return false;
  };

  async function validateAndSerializeFields(): Promise<{
    payload: SerializedMintFormFields;
    imageIPFSMetadata: FileMetadata | null;
    kmlIPFSMetadata: FileMetadata | null;
  }> {
    //@ts-ignore
    const payload: SerializedMintFormFields = {
      image_: "",
      attrKml_: ""
    };

    // Validate and sanitize inputs
    for (const fieldId in values) {
      const valid = validateField(fieldId);
      if (!valid) {
        scrollToError(fieldId);
        throw new Error();
      }

      let value = values[fieldId];

      if (!!value) {
        // Escape double quotes
        value = escapeQuotes(value);

        // If field isn't a domain, escape colons.
        if (!domainFields.includes(fieldId)) {
          value = escapeColons(value);
        }
      }

      //@ts-ignore
      payload[fieldId] = value;
    }

    // Serialize location
    if (state.attrLocation_) {
      let features: Array<Feature> = [];
      if (state.attrLocation_.type === "Point") {
        features.push({
          type: "Feature",
          geometry: state.attrLocation_,
          properties: {}
        });
      } else if (state.attrLocation_.type === "FeatureCollection") {
        features = Object.values(state.attrLocation_?.features);
      }

      payload["attrLocation_"] = serializeFeatures(features);
    } else {
      scrollToError("attrLocation_");
      throw new Error();
    }

    //? IPFS UPLOADS

    // Upload image to IPFS
    let imageIPFSMetadata: FileMetadata | null = null;
    if (!!images.image_) {
      imageIPFSMetadata = await ipfs.uploadImage(images.image_);
      payload.image_ = imageIPFSMetadata.uri;
    }

    // Upload KML to IPFS
    let kmlIPFSMetadata: FileMetadata | null = null;
    if (state.attrKml_) {
      kmlIPFSMetadata = await ipfs.uploadFile(state.attrKml_);
      payload.attrKml_ = kmlIPFSMetadata.uri;
    }

    return { payload, imageIPFSMetadata, kmlIPFSMetadata };
  }

  //
  //
  // RENDER
  //
  //

  return (
    <Context.Provider
      value={{
        ...defaultState,
        values,
        images,
        setValue: (fieldId: string, value: string) => {
          setValues((prevState) => ({
            ...prevState,
            [fieldId]: value
          }));
        },
        setImage: (fieldId: string, value: Image | null) => {
          setImages((prevState) => ({
            ...prevState,
            [fieldId]: value
          }));
        },
        errors,
        validateField,
        state,
        dispatch,
        validating,
        validateFormState: async () => {
          try {
            setValidating(true);
            const res = await validateAndSerializeFields();
            setMetadata(serializeMetadata(res.payload));
          } catch (error) {
          } finally {
            setValidating(false);
          }
        },
        validated: Boolean(metadata),
        metadata
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
