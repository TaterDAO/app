// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

const ExternalUrlInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="externalUrl_"
      placeholder="https://farmapper.com/big-parcel"
      label="External URL"
      description="Website where more information can be found about the property"
    />
  );
};

export default ExternalUrlInput;
