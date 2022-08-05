// Components
import { Row, ErrorMessage } from "@components/ui/Form";
import InputMeta from "./InputMetadata";
import MultiLevelSelect from "@components/ui/MultiLevelSelect";

// Types
import type { Option } from "@T/Form";
import type { GenericFormState } from "./types";

const MultiLevelSelectInput: React.FC<{
  form: GenericFormState;
  fieldId: string;
  label: string;
  description: string;
  placeholder: string;
  options: Array<Option>;
}> = ({ form, fieldId, label, description, placeholder, options }) => {
  const hasError = Boolean(form.errors[fieldId]);

  return (
    <Row>
      <InputMeta
        form={form}
        fieldId={fieldId}
        label={label}
        description={description}
      />
      <MultiLevelSelect
        fieldId={fieldId}
        options={options}
        value={form.values[fieldId]}
        disabled={form.submitting}
        onChange={(value: string) => {
          form.setValue(fieldId, value);
          // Don't validate value resets
          if (value !== "") {
            form.validateField(fieldId, value);
          }
        }}
        invalid={hasError}
      />
      {hasError && <ErrorMessage>{form.errors[fieldId]}</ErrorMessage>}
    </Row>
  );
};

export default MultiLevelSelectInput;
