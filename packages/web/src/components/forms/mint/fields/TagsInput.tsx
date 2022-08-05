// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

const TagsInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="attrTag_"
      placeholder=""
      label="Tags"
      description=""
    />
  );
};

export default TagsInput;
