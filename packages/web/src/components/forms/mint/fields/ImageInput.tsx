import GenericImageInput from "@components/forms/ImageInput";

// Hooks
import useMintForm from "../useMintForm";

const ImageInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <GenericImageInput
      form={form}
      fieldId="image_"
      label="Image"
      description="Image of the property"
    />
  );
};

export default ImageInput;
