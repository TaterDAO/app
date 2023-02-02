// Components
import { Row } from "@components/ui/Form";
import InputMeta from "./InputMetadata";

// Types
import type { GenericFormState } from "@T/Form";

// Libs
import styled from "styled-components";

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  row-gap: var(--global-space-y-margin);
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;

  label {
    cursor: inherit;
  }
`;

const MultiCheckboxInput: React.FC<{
  form: GenericFormState;
  fieldId: string;
  label: string;
  description: string;
  options: Array<Array<string>>;
  value: Set<string>;
  onSelect: (value: string) => void;
  onDeselect: (value: string) => void;
}> = ({
  form,
  fieldId,
  label,
  description,
  options,
  value,
  onSelect,
  onDeselect
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionId = e.target.value;
    if (e.target.checked) onSelect(optionId);
    else onDeselect(optionId);
  };

  return (
    <Row>
      <InputMeta
        fieldId={fieldId}
        label={label}
        description={description}
        required={form.requiredFields.includes(fieldId)}
      />
      <OptionsContainer>
        {options.map(([id, label]) => {
          const key = `${fieldId}-option-${id}`;
          return (
            <Option key={key}>
              <label htmlFor={key}>{label}</label>
              <input
                type="checkbox"
                value={id}
                id={key}
                onChange={handleChange}
                checked={value.has(id)}
              />
            </Option>
          );
        })}
      </OptionsContainer>
    </Row>
  );
};

export default MultiCheckboxInput;
