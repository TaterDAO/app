import Context, { defaultState } from "./Context";

// Hooks
import { useReducer, useState } from "react";
import useWeb3 from "@hooks/useWeb3";

// Types
import type { GenericFormState, SerializedMintFormFields } from "@T/Form";
import type { Image } from "@T/Image";
import type { Feature } from "geojson";
import type { FileMetadata } from "@services/IPFS";

// Utils
import { escapeQuotes, escapeColons } from "@utils/form";
import { serializeFeatures } from "@libs/TitleLocation";

// Services
import * as ipfs from "@services/IPFS";

// Libs
import { metadataCollection } from "@services/Firebase";
import { addDoc } from "firebase/firestore";

// Context
import reducer from "@contexts/mint/reducer";
import { DEFAULT_STATE } from "@contexts/mint/constants";

const domainFields = ["externalUrl_", "attrDeed_", "attrKml_"];

const Provider: React.FC<{ children: React.ReactChild }> = ({ children }) => {
  const web3 = useWeb3();

  const [submitting, setSubmitting] = useState<boolean>(
    defaultState.submitting
  );
  const [values, setValues] = useState<GenericFormState["values"]>(
    defaultState.values
  );
  const [images, setImages] = useState<GenericFormState["images"]>(
    defaultState.images
  );
  const [errors, setError] = useState<GenericFormState["errors"]>(
    defaultState.errors
  );

  //! WIP | Currently: KML & Location
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const setValue = (fieldId: string, value: string) => {
    setValues((prevState) => ({
      ...prevState,
      [fieldId]: value
    }));
  };

  const setImage = (fieldId: string, value: Image | null) => {
    setImages((prevState) => ({
      ...prevState,
      [fieldId]: value
    }));
  };

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

  const submit = async () => {
    setSubmitting(true);

    //@ts-ignore
    const payload: SerializedMintFormFields = {};

    // Validate

    // Validate and sanitize inputs
    for (const fieldId in values) {
      const valid = validateField(fieldId);
      if (!valid) {
        setSubmitting(false);
        throw { type: "field-validation", fieldId };
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
      throw { type: "field-validation", fieldId: "attrLocation_" };
    }

    //? IPFS UPLOADS

    // Upload image to IPFS
    let imageIPFSMetadata: FileMetadata | null = null;
    if (!!images.image_) {
      imageIPFSMetadata = await ipfs.uploadImage(images.image_);
      payload["image_"] = imageIPFSMetadata.uri;
    } else {
      payload["image_"] = "";
    }

    // Upload KML to IPFS
    let kmlIPFSMetadata: FileMetadata | null = null;
    if (state.attrKml_) {
      kmlIPFSMetadata = await ipfs.uploadFile(state.attrKml_);
      payload["attrKml_"] = kmlIPFSMetadata.uri;
    } else {
      payload["attrKml_"] = "";
    }

    // Save metadata to database
    const ref = await addDoc(metadataCollection, payload);
    console.log(ref);

    // TODO: Use same token id

    //? Submit the transaction on-chain
    try {
      await window.td.minter?.mint(payload, web3.wallet.address as string);
    } catch (error) {
      setSubmitting(false);
      // Unpin image and KML files if present
      if (imageIPFSMetadata) await ipfs.removeFile(imageIPFSMetadata.hash);
      if (kmlIPFSMetadata) await ipfs.removeFile(kmlIPFSMetadata.hash);
      throw error;
    }
  };

  return (
    <Context.Provider
      value={{
        ...defaultState,
        submitting,
        values,
        images,
        setValue,
        setImage,
        setSubmitting: (bool: boolean): void => {
          setSubmitting(bool);
        },
        submit,
        errors,
        validateField,
        state,
        dispatch
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
