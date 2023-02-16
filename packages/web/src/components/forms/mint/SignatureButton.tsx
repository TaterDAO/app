import { Row, ErrorMessage } from "@components/ui/Form";
import InputMeta from "../InputMetadata";
import Button from "@components/ui/Button";

// Hooks
import useMintForm from "./useMintForm";
import { useSignMessage } from "wagmi";
import { useEffect } from "react";
import { ActionType } from "@contexts/mint/types";

const SignatureButton: React.FC<{}> = ({}) => {
  const form = useMintForm();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: JSON.stringify(form.metadata)
  });

  useEffect(() => {
    if (isSuccess) {
      form.dispatch({
        type: ActionType.SetMetadataSignature,
        value: data as string
      });
    }
  }, [isSuccess, data]);

  return (
    <Row>
      <InputMeta
        fieldId="metadataSignature"
        label="Title Signature"
        required
        description="Signing your title ensures its authenticity, prevents any third party modification, and proves that you are its legitimate author. Signing does not cost any gas and does not submit a transaction on-chain."
      />
      <Button primary onClick={() => signMessage()} disabled={isLoading}>
        Sign
      </Button>
      {isError && <ErrorMessage>Error signing</ErrorMessage>}
    </Row>
  );
};

export default SignatureButton;
