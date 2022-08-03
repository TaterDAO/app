// Components
import {
  FieldMeta,
  FieldLabel,
  FieldSecondaryLabel,
  FieldDescription
} from "@components/ui/Form";

// Types
import type { GenericFormState } from "./types";

const InputMeta: React.FC<{
  form: GenericFormState;
  fieldId: string;
  label: string;
  description: string;
}> = ({ form, fieldId, label, description }) => {
  return (
    <FieldMeta id={`form-input-metadata-${fieldId}`}>
      <FieldLabel>{label}</FieldLabel>
      {form.requiredFields.includes(fieldId) && (
        <FieldSecondaryLabel>Required</FieldSecondaryLabel>
      )}
      <FieldDescription>{description}</FieldDescription>
    </FieldMeta>
  );
};

export default InputMeta;
