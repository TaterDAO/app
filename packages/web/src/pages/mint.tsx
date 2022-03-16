// Types
import type Web3 from "web3";
import type { NextPage } from "next";
type Map = { [key: string]: string };
type BooleanMap = { [key: string]: boolean };

// Components
import Input from "@components/ui/Input";
import * as Form from "@components/ui/Form";
import Button from "@components/ui/Button";
import Error from "@components/ui/Error";

// Hooks
import { useState, useEffect } from "react";
import useWeb3 from "@hooks/useWeb3";
import { useRouter } from "next/router";

// Libs
import Joi from "joi";
import Minter from "@libs/Minter";
import { toast } from "react-toastify";

// Utils
import { csr } from "@utils/browser";

// Data
import ABI from "@data/contracts/TitleV1_0.sol/TitleV1_0.json";

const mintMethod = ABI.find(({ name }) => name === "mint");
const inputs = mintMethod?.inputs.map(({ name }) => name) as Array<string>;
const initialState = inputs.reduce(
  (memo, id) => ({ ...memo, [id]: "" }),
  {}
) as Map;

const labelMap: Map = {
  name_: "Name",
  description_: "Description",
  externalUrl_: "External Url",
  image_: "Image Url",
  attrLandClassification_: "Land Classification",
  attrLocation_: "Location",
  attrDeed_: "Legal / Deed Url",
  attrParcels_: "Parcels",
  attrOwner_: "Owner",
  attrKml_: "KML Url",
  attrTag_: "Tags"
};

const requiredMap: BooleanMap = {
  name_: true,
  description_: true,
  externalUrl_: false,
  image_: false,
  attrLandClassification_: true,
  attrLocation_: true,
  attrDeed_: false,
  attrParcels_: true,
  attrOwner_: false,
  attrKml_: false,
  attrTag_: false
};

const validationSchema = Joi.object(
  inputs.reduce((memo, id) => {
    return {
      ...memo,
      [id]: Joi.string().min(requiredMap[id] ? 1 : 0)
    };
  }, {})
);

const MintPage: NextPage = ({}) => {
  // =============
  // === State ===
  // =============

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [state, set] = useState<Map>(initialState);
  const [errorField, setErrorField] = useState<string>("");

  const [minter, setMinter] = useState<Minter>();

  // =============
  // === Hooks ===
  // =============
  const router = useRouter();
  const web3 = useWeb3();
  const isClient = csr();

  // ===============
  // === Effects ===
  // ===============

  useEffect(() => {
    if (!!web3.network.chainId) {
      setMinter(
        new Minter(web3.web3API as Web3, web3.network.chainId as number)
      );
    }
  }, [web3.web3API, web3.network.chainId]);

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

  const handleSubmit = async () => {
    try {
      setErrorField("");
      setSubmitting(true);

      const { error } = validationSchema.validate(state);
      if (error) {
        const fieldId = error.details[0].path[0] as string;
        toast.error(`${labelMap[fieldId]} is required`);
        setErrorField(fieldId);
        return;
      }

      const trxHash = (await minter?.mint(
        state,
        web3.wallet.address as string
      )) as string;

      // Show success notification and redirect home
      toast.success(`Transaction submitted to ${web3.network.name}`);
      router.push("/profile");
    } catch (error) {
      toast.error((error as unknown as any).toString() as string);
    } finally {
      setSubmitting(false);
    }
  };

  // ==============
  // === Render ===
  // ==============

  return (
    <>
      <Form.Container>
        {inputs.map((fieldId) => {
          const id = `form-row-${fieldId}`;
          return (
            <Form.Row key={id} id={id}>
              <Form.FieldLabel>{labelMap[fieldId]}</Form.FieldLabel>
              {requiredMap[fieldId] && (
                <Form.FieldSecondaryLabel>Required</Form.FieldSecondaryLabel>
              )}
              <Input
                disabled={submitting}
                value={state[fieldId]}
                onChange={(e) =>
                  set((prevState) => ({
                    ...prevState,
                    [fieldId]: e.target.value
                  }))
                }
                invalid={errorField === fieldId}
              />
            </Form.Row>
          );
        })}
        <Form.Row>
          {web3.wallet.connected ? (
            <Button primary big disabled={submitting} onClick={handleSubmit}>
              Mint
            </Button>
          ) : (
            <Error>You must connect your wallet to mint</Error>
          )}
        </Form.Row>
      </Form.Container>
    </>
  );
};

export default MintPage;
