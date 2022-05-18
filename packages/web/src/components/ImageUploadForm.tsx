// Components
import * as Form from "@components/ui/Form";
import Button from "@components/ui/Button";

// Libs
import styled from "styled-components";

// Hooks
import { useRef } from "react";

const InputWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  column-gap: var(--global-space-y-margin);
`;

const ImageUploadForm: React.FC<{
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  isClearable: boolean;
}> = ({ id, onChange, onClear, isClearable }) => {
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
