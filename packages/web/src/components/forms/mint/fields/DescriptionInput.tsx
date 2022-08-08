// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

const DescriptionInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="description_"
      placeholder="400 acres of lush forests with a mighty lake in the center"
      label="Description"
      description="Description of the property."
    />
  );
};

export default DescriptionInput;
