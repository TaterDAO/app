// Components
import { Row, ErrorMessage, FileInput } from "@components/ui/Form";
import Button from "@components/ui/Button";
import PreviewImage from "@components/PreviewImage";
import InputMeta from "./InputMetadata";

// Libs
import styled from "styled-components";

// Hooks
import { useRef, useState } from "react";

// Types
import type { Image } from "@T/Image";
import type { GenericFormState } from "./types";
import { ImageSrcType } from "@T/Image";

// Constants
import { MAX_IMAGE_FILE_SIZE } from "@constants/image";

// Utils
import { getImageDimensionsFromFile } from "@utils/image";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  row-gap: var(--global-space-y-margin);
`;

const ImageInput: React.FC<{
  form: GenericFormState;
  fieldId: string;
  label: string;
  description: string;
}> = ({ form, fieldId, label, description }) => {
  const el = useRef<HTMLInputElement>(null);

  const [internalErrorMessage, setInternalErrorMessage] = useState<string>("");

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target?.files ? event.target.files[0] : null;

    if (!file) return;

    // Validate file size
    if (file.size / 1e6 > MAX_IMAGE_FILE_SIZE) {
      setInternalErrorMessage(
        `Image exceeds maximum file size of ${MAX_IMAGE_FILE_SIZE}mb`
      );
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

  const hasError =
    Boolean(internalErrorMessage) || Boolean(form.errors[fieldId]);
  const preview = form.images[fieldId];
  const hasPreview = Boolean(preview);

  return (
    <Row>
      <InputMeta
        form={form}
        fieldId={fieldId}
        label={label}
        description={description}
      />
      <InputWrapper>
        {hasPreview && <PreviewImage data={preview as Image} />}
        <FileInput
          ref={el}
          accept="image/*"
          multiple={false}
          onChange={handleImageUpload}
        />
        {hasPreview && <Button onClick={handleClear}>Clear</Button>}
      </InputWrapper>
      {hasError && (
        <ErrorMessage>
          {internalErrorMessage || form.errors[fieldId]}
        </ErrorMessage>
      )}
    </Row>
  );
};

export default ImageInput;
