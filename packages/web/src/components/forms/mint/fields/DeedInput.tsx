// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

const DeedInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="attrDeed_"
      placeholder=""
      label="Deed"
      description="Legal / Deed URL"
    />
  );
};

export default DeedInput;
