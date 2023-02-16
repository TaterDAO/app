// Components
import { Row, Input, ErrorMessage } from "@components/ui/Form";
import InputMeta from "./InputMetadata";

// Types
import type { MintFormContext } from "@T/Form";

const TextInput: React.FC<{
  form: MintFormContext;
  fieldId: string;
  placeholder: string;
  label: string;
  description: string;
  // Optional: Overwrite default form read/write strategy, for example
  // to hook into a reducer.
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ form, fieldId, placeholder, label, description, value, onChange }) => {
  const hasError = Boolean(form.errors[fieldId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(fieldId, e.target.value);
  };

  return (
    <Row>
      <InputMeta
        fieldId={fieldId}
        label={label}
        description={description}
        required={form.requiredFields.includes(fieldId)}
      />
      <Input
        disabled={form.submitting}
        placeholder={placeholder}
        onChange={onChange || handleChange}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          form.validateField(fieldId)
        }
        value={value || form.values[fieldId]}
        invalid={hasError}
      />
      {hasError && <ErrorMessage>{form.errors[fieldId]}</ErrorMessage>}
    </Row>
  );
};

export default TextInput;
