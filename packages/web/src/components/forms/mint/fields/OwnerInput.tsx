// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

const OwnerInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="attrOwner_"
      placeholder="Jon Bon Jovi"
      label="Owner"
      description="Who owns the property?"
    />
  );
};

export default OwnerInput;
