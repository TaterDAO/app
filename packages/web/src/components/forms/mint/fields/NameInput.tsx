// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

const NameInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="name_"
      placeholder="44 Big Sky Drive"
      label="Name"
      description="Name of the property."
    />
  );
};

export default NameInput;
