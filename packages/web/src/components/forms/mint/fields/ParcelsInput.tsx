// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

const ParcelsInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="attrParcels_"
      placeholder=""
      label="Parcels"
      description=""
    />
  );
};

export default ParcelsInput;
