// Components
import * as Form from "@components/ui/Form";
import Button from "@components/ui/Button";
import PreviewImage from "@components/PreviewImage";

// Libs
import styled from "styled-components";

// Hooks
import { useRef } from "react";

// Types
import type { Image } from "@T/Image";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  row-gap: var(--global-space-y-margin);
`;

const ImageUploadForm: React.FC<{
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  isClearable: boolean;
  preview: Image | null;
}> = ({ id, onChange, onClear, isClearable, preview }) => {
  const el = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    // Reset value
    if (el.current) el.current.value = "";
    onClear();
  };

  return (
    <Form.Row key={id} id={id}>
      <Form.FieldMeta>
        <Form.FieldLabel>Image</Form.FieldLabel>
      </Form.FieldMeta>
      <InputWrapper>
        {!!preview && <PreviewImage data={preview} />}
        <Form.FileInput
          ref={el}
          accept="image/*"
          multiple={false}
          onChange={onChange}
        />
        {isClearable && <Button onClick={handleClear}>Clear</Button>}
      </InputWrapper>
    </Form.Row>
  );
};

export default ImageUploadForm;
