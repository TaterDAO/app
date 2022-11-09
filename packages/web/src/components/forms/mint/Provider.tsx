import Context, { defaultState } from "./Context";

// Hooks
import { useReducer, useState } from "react";
import useWeb3 from "@hooks/useWeb3";

// Types
import type { GenericFormState, SerializedMintFormFields } from "@T/Form";
import type { Image } from "@T/Image";

// Utils
import { escapeQuotes, escapeColons } from "@utils/form";

// Services
import * as ipfs from "@services/IPFS";

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
    console.log(fieldId, value);
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
    const cleanState: SerializedMintFormFields = {};

    // Merge state and reducer values.
    const mergedValues: any = { ...values, ...state };

    // Validate

    // Validate and sanitize inputs
    for (const fieldId in mergedValues) {
      const valid = validateField(fieldId);
      if (!valid) {
        setSubmitting(false);
        throw { type: "field-validation", fieldId };
      }

      let value = mergedValues[fieldId];

      if (!!value && fieldId != "attrLocation_") {
        // Escape double quotes
        value = escapeQuotes(value);

        // If field isn't a domain, escape colons.
        if (!domainFields.includes(fieldId)) {
          value = escapeColons(value);
        }
      }

      //@ts-ignore
      cleanState[fieldId] = value;
    }

    // Upload image to IPFs
    if (!!images.image_) {
      const res = await ipfs.uploadImage(images.image_);
      cleanState["image_"] = res.uri;
    } else {
      cleanState["image_"] = "";
    }

    // Serialize location
    if (values.attrLocation_ && values.attrLocation_.type === "Point") {
      const [lng, lat] = values.attrLocation_.coordinates;
      cleanState["attrLocation_"] = `${lat}, ${lng}`;
    } else if (
      values.attrLocation_ &&
      values.attrLocation_.type === "FeatureCollection"
    ) {
      cleanState["attrLocation_"] = Object.values(
        values.attrLocation_?.features
      )
        //@ts-ignore
        .map((feature) => feature.geometry.coordinates.toString())
        .join(";");
    } else {
      throw new Error("Bad location data");
    }

    // Submit the transaction on-chain
    try {
      await window.td.minter?.mint(cleanState, web3.wallet.address as string);
    } catch (error) {
      setSubmitting(false);
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
