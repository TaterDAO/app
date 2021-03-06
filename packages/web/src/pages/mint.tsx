// Types
import type Web3 from "web3";
import type { NextPage } from "next";
type Map = { [key: string]: string };
import type { Image } from "@T/Image";
import { ImageSrcType } from "@T/Image";

// Components
import * as Form from "@components/ui/Form";
import Button from "@components/ui/Button";
import ConnectWalletForm from "@components/ConnectWalletForm";
import TitledPage from "@components/layouts/TitledPage";
import UnsupportedNetwork from "@components/UnsupportedNetwork";
import ImageUploadForm from "@components/ImageUploadForm";

// Hooks
import { useState, useEffect } from "react";
import useWeb3 from "@hooks/useWeb3";
import { useRouter } from "next/router";

// Libs
import Joi from "joi";
import { toast } from "react-toastify";

// Utils
import { csr } from "@utils/browser";
import { getImageDimensionsFromFile } from "@utils/image";

// Data
import ABI from "@data/contracts/TitleV1_0.sol/TitleV1_0.json";

// Constants
import { MAX_IMAGE_FILE_SIZE } from "@constants/image";

// Services
import * as ipfs from "@services/IPFS";

const mintMethod = ABI.find(({ name }) => name === "mint");
const inputs = mintMethod?.inputs.map(({ name }) => name) as Array<string>;
const initialState = inputs.reduce(
  (memo, id) => ({ ...memo, [id]: "" }),
  {}
) as Map;

// Handled separately
delete initialState["image_"];

const labelMap: Map = {
  name_: "Name",
  description_: "Description",
  externalUrl_: "External Url",
  attrLandClassification_: "Land Classification",
  attrLocation_: "Location",
  attrDeed_: "Legal / Deed Url",
  attrParcels_: "Parcels",
  attrOwner_: "Owner",
  attrKml_: "KML Url",
  attrTag_: "Tags"
};

const requiredFields = [
  "name_",
  "description_",
  "attrLandClassification_",
  "attrLocation_",
  "attrParcels_"
];

const domainFields = ["externalUrl_", "attrDeed_", "attrKml_"];

const validationSchema = Joi.object({
  name_: Joi.string(),
  description_: Joi.string(),
  externalUrl_: Joi.string().allow("").uri(),
  attrLandClassification_: Joi.string(),
  attrLocation_: Joi.string(),
  attrDeed_: Joi.string().allow("").uri(),
  attrParcels_: Joi.string(),
  attrOwner_: Joi.string().allow(""),
  attrKml_: Joi.string().allow("").uri(),
  attrTag_: Joi.string().allow("")
});

const MintPage: NextPage = ({}) => {
  // =============
  // === State ===
  // =============

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [state, set] = useState<Map>(initialState);
  const [image, setImage] = useState<Image | null>(null);
  const [errorField, setErrorField] = useState<string>("");

  // =============
  // === Hooks ===
  // =============
  const router = useRouter();
  const web3 = useWeb3();
  const isClient = csr();

  // ===============
  // === Effects ===
  // ==============

  useEffect(() => {
    if (isClient && errorField) {
      (
        document.getElementById(`form-row-${errorField}`) as HTMLElement
      ).scrollIntoView({ behavior: "smooth" });
    }
  }, [isClient, errorField]);

  // ================
  // === Handlers ===
  // ================

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target?.files ? event.target.files[0] : null;

    if (!file) return;

    // Validate file size
    if (file.size / 1e6 > MAX_IMAGE_FILE_SIZE) {
      toast.error(
        `Image exceeds maximum file size of ${MAX_IMAGE_FILE_SIZE}mb`
      );
      return;
    }

    const { height, width } = await getImageDimensionsFromFile(file);
    const image = {
      src: file,
      type: ImageSrcType.Blob,
      id: file.name,
      height,
      width
    } as Image;
    setImage(image);
  };

  const handleSubmit = async () => {
    try {
      setErrorField("");
      setSubmitting(true);

      // Validate the input against schema requirements
      const { error } = validationSchema.validate(state);
      if (error) {
        const details = error.details[0];
        const fieldId = details.path[0] as string;
        const name = labelMap[fieldId];

        let message: string;
        switch (details.type) {
          case "string.empty": {
            message = `${name} is required`;
            break;
          }
          case "string.uri": {
            message = `${name} must be a valid url and include http:// or https://`;
            break;
          }
          default: {
            message = `${name} is invalid`;
          }
        }

        toast.error(message);
        setErrorField(fieldId);
        return;
      }

      const cleanState: Map = {};

      // Sanitize inputs
      for (const fieldId in state) {
        let value = state[fieldId];
        // Escape double quotes
        value = value.replaceAll(/\\"/g, "&quot;");

        // Is this a domain field w/o {http|https}?
        if (
          domainFields.includes(fieldId) &&
          value !== "" &&
          !new RegExp(/https?:\/\//).test(value)
        ) {
          value = `http://${value}`;
        }

        cleanState[fieldId] = value;
      }

      // Upload image to IPFs
      if (!!image) {
        const res = await ipfs.uploadImage(image);
        cleanState["image_"] = res.uri;
      }

      // Submit the transaction on-chain
      await window.td.minter?.mint(cleanState, web3.wallet.address as string);

      // Show success notification and redirect home
      toast.success(`Transaction submitted to ${web3.network.name}`);
      router.push("/profile");
    } catch (error) {
      toast.error((error as unknown as any).message as string);
    } finally {
      setSubmitting(false);
    }
  };

  // ==============
  // === Render ===
  // ==============

  return (
    <TitledPage title="Create a title">
      {web3.initialized && web3.wallet.connected ? (
        web3.network.supported ? (
          <>
            <Form.Container>
              {inputs.map((fieldId) => {
                const id = `form-row-${fieldId}`;
                return fieldId === "image_" ? (
                  <ImageUploadForm
                    key={id}
                    id={id}
                    onChange={handleImageUpload}
                    isClearable={!!image}
                    onClear={() => setImage(null)}
                    preview={image}
                  />
                ) : (
                  <Form.Row key={id} id={id}>
                    <Form.FieldMeta>
                      <Form.FieldLabel>{labelMap[fieldId]}</Form.FieldLabel>
                      {requiredFields.includes(fieldId) && (
                        <Form.FieldSecondaryLabel>
                          Required
                        </Form.FieldSecondaryLabel>
                      )}
                    </Form.FieldMeta>
                    <Form.Input
                      disabled={submitting}
                      value={state[fieldId]}
                      onChange={(e) =>
                        set((prevState) => ({
                          ...prevState,
                          [fieldId]: e.target.value
                        }))
                      }
                      invalid={errorField === fieldId}
                      placeholder={`Enter ${labelMap[fieldId]}...`}
                    />
                  </Form.Row>
                );
              })}
              <Form.Row>
                <Button primary disabled={submitting} onClick={handleSubmit}>
                  Mint
                </Button>
              </Form.Row>
            </Form.Container>
          </>
        ) : (
          <UnsupportedNetwork />
        )
      ) : (
        <ConnectWalletForm />
      )}
    </TitledPage>
  );
};

export default MintPage;
