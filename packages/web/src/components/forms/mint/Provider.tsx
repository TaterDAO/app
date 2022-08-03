import Context, { defaultState } from "./Context";

// Hooks
import { useState } from "react";
import useWeb3 from "@hooks/useWeb3";

// Types
import type { GenericFormState } from "../types";
import type { Image } from "@T/Image";

// Utils
import { escapeQuotes, escapeColons } from "@utils/form";

// Services
import * as ipfs from "@services/IPFS";

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

  const validateField = (fieldId: string) => {
    const { error } = defaultState.validationSchema.validate({
      [fieldId]: values[fieldId]
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

    const cleanState: GenericFormState["values"] = {};

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

        // Escape colons
        value = escapeColons(value);

        // Is this a domain field w/o {http|https}?
        if (
          domainFields.includes(fieldId) &&
          value !== "" &&
          !new RegExp(/https?:\/\//).test(value)
        ) {
          value = `http://${value}`;
        }
      }

      cleanState[fieldId] = value;
    }

    // Upload image to IPFs
    if (!!images.image_) {
      const res = await ipfs.uploadImage(images.image_);
      cleanState["image_"] = res.uri;
    } else {
      cleanState["image_"] = "";
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
        submit,
        errors,
        validateField
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
