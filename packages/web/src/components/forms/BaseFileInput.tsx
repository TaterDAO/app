// Components
import {
  Row,
  ErrorMessage,
  FileInput as FileInputEl
} from "@components/ui/Form";
import Button from "@components/ui/Button";
import InputMeta from "./InputMetadata";

// Libs
import styled from "styled-components";

// Hooks
import { useRef, useState } from "react";

// Types
import type { GenericFormState } from "@T/Form";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  row-gap: var(--global-space-y-margin);
`;

const BaseFileInput: React.FC<{
  form: GenericFormState;
  fieldId: string;
  label: string;
  description: string;
  mimeType: string;
  acceptMultiple?: boolean;
  handleUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
  handleClear?: () => void;
  filePreview: React.ReactElement | null;
  inputRef: React.RefObject<HTMLInputElement>;
}> = ({
  form,
  fieldId,
  label,
  description,
  mimeType,
  acceptMultiple = false,
  handleUpload,
  handleClear = () => {},
  filePreview,
  inputRef
}) => {
  const [internalErrorMessage, setInternalErrorMessage] = useState<string>("");
  const hasError =
    Boolean(internalErrorMessage) || Boolean(form.errors[fieldId]);

  const hasPreview = filePreview !== null;

  return (
    <Row>
      <InputMeta
        form={form}
        fieldId={fieldId}
        label={label}
        description={description}
      />
      <InputWrapper>
        {hasPreview && filePreview}
        <FileInputEl
          ref={inputRef}
          accept={mimeType}
          multiple={acceptMultiple}
          onChange={(event) => handleUpload(event, setInternalErrorMessage)}
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

export default BaseFileInput;
