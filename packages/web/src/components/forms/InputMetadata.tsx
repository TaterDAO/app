// Components
import {
  FieldMeta,
  FieldLabel,
  FieldSecondaryLabel,
  FieldDescription
} from "@components/ui/Form";

const InputMeta: React.FC<{
  fieldId: string;
  label: string;
  description: string;
  required: boolean;
}> = ({ fieldId, label, description, required }) => {
  return (
    <FieldMeta id={`form-input-metadata-${fieldId}`}>
      <FieldLabel>{label}</FieldLabel>
      {required && <FieldSecondaryLabel>Required</FieldSecondaryLabel>}
      <FieldDescription>{description}</FieldDescription>
    </FieldMeta>
  );
};

export default InputMeta;
