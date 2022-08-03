// Components
import {
  Row,
  Input,
  FieldMeta,
  FieldLabel,
  FieldSecondaryLabel,
  ErrorMessage,
  FieldDescription
} from "@components/ui/Form";
import InputMeta from "./InputMetadata";

// Types
import type { GenericFormState } from "./types";

const TextInput: React.FC<{
  form: GenericFormState;
  fieldId: string;
  placeholder: string;
  label: string;
  description: string;
}> = ({ form, fieldId, placeholder, label, description }) => {
  const value = form.values[fieldId];
  const hasError = Boolean(form.errors[fieldId]);

  return (
    <Row>
      <InputMeta
        form={form}
        fieldId={fieldId}
        label={label}
        description={description}
      />
      <Input
        disabled={form.submitting}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          form.setValue(fieldId, e.target.value)
        }
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          form.validateField(fieldId)
        }
        value={value}
        invalid={hasError}
      />
      {hasError && <ErrorMessage>{form.errors[fieldId]}</ErrorMessage>}
    </Row>
  );
};

export default TextInput;
