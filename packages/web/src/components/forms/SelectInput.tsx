// Components
import { Row, Select, ErrorMessage } from "@components/ui/Form";
import InputMeta from "./InputMetadata";

// Types
import type { MintFormContext } from "@T/Form";

const SelectInput: React.FC<{
  form: MintFormContext;
  fieldId: string;
  label: string;
  description: string;
  placeholder: string;
  options: Array<{ label: string; value: string }>;
}> = ({ form, fieldId, label, description, placeholder, options }) => {
  const value = form.values[fieldId];
  const hasError = Boolean(form.errors[fieldId]);

  return (
    <Row>
      <InputMeta
        fieldId={fieldId}
        label={label}
        description={description}
        required={form.requiredFields.includes(fieldId)}
      />
      <Select
        disabled={form.submitting}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          form.setValue(fieldId, e.target.value)
        }
        value={value}
        invalid={hasError}
        placeholderSelected={value === ""}
      >
        <option data-placeholder disabled={value !== ""}>
          {placeholder}
        </option>
        {options.map(({ value, label }) => (
          <option key={`${fieldId}-${value}`} value={value}>
            {label}
          </option>
        ))}
      </Select>
      {hasError && <ErrorMessage>{form.errors[fieldId]}</ErrorMessage>}
    </Row>
  );
};

export default SelectInput;
