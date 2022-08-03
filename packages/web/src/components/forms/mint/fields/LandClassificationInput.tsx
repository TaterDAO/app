// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

const LandClassificationInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="attrLandClassification_"
      placeholder=""
      label="Land Classification"
      description=""
    />
  );
};

export default LandClassificationInput;
