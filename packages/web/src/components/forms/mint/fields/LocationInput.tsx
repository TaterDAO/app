// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

const LocationInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="attrLocation_"
      placeholder=""
      label="Location"
      description=""
    />
  );
};

export default LocationInput;
