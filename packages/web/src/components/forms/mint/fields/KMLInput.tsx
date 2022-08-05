// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

const KMLInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="attrKml_"
      placeholder=""
      label="KML"
      description=""
    />
  );
};

export default KMLInput;
