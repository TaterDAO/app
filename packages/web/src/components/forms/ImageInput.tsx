// Components
import PreviewImage from "@components/PreviewImage";
import BaseFileInput from "./BaseFileInput";

// Hooks
import { useRef } from "react";

// Types
import type { Image } from "@T/Image";
import type { GenericFormState } from "@T/Form";
import { ImageSrcType } from "@T/Image";

// Constants
import { MAX_IMAGE_FILE_SIZE } from "@constants/image";

// Utils
import { getImageDimensionsFromFile } from "@utils/image";

const ImageInput: React.FC<{
  form: GenericFormState;
  fieldId: string;
  label: string;
  description: string;
}> = ({ form, fieldId, label, description }) => {
  const el = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target?.files ? event.target.files[0] : null;

    if (!file) return;

    // Validate file size
    if (file.size / 1e6 > MAX_IMAGE_FILE_SIZE) {
      setError(`Image exceeds maximum file size of ${MAX_IMAGE_FILE_SIZE}mb`);
      return;
    }

    const { height, width } = await getImageDimensionsFromFile(file);
    form.setImage(fieldId, {
      src: file,
      type: ImageSrcType.Blob,
      id: file.name,
      height,
      width
    } as Image);
  };

  const handleClear = () => {
    // Reset value
    if (el.current) el.current.value = "";
    form.setImage(fieldId, null);
  };

  const preview = form.images[fieldId];
  const hasPreview = Boolean(preview);

  return (
    <BaseFileInput
      form={form}
      fieldId={fieldId}
      label={label}
      description={description}
      mimeType="image/*"
      acceptMultiple={false}
      handleUpload={handleImageUpload}
      handleClear={handleClear}
      filePreview={hasPreview ? <PreviewImage data={preview as Image} /> : null}
      inputRef={el}
    />
  );
};

export default ImageInput;
