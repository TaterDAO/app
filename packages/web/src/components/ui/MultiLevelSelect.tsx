import styled from "styled-components";
import { ArrowRightCircled, ArrowLeftCircled } from "iconoir-react";

// Hooks
import { useState, useEffect } from "react";

interface Option {
  value: string;
  label: string;
  description: string;
  subOptions?: Array<Option>;
}

const Container = styled.div<{ disabled: boolean; invalid: boolean }>`
  width: 100%;
  max-width: 650px;
  height: 400px;
  overflow-y: scroll;
  border-radius: var(--global-border-radius);
  border: 1px solid;
  border-color: ${({ invalid }) =>
    invalid ? "var(--global-color-error)" : "var(--global-color-border)"};
  ${({ disabled }) => disabled && `filter: grayscale(1)`};
`;

const Label = styled.div`
  font-weight: 600;
  transition: var(--global-transition);
`;

const Description = styled.p`
  padding-left: var(--global-space-x-margin);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--global-color-border);
  margin-bottom: calc(var(--global-space-y-margin) / 2);
  padding-bottom: calc(var(--global-space-y-margin) / 3);
`;

const ArrowWrapper = styled.div`
  width: 50px;
  display: flex;
  align-items: flex-start;

  svg {
    color: var(--global-color-border);
    width: 50px;
    transition: var(--global-transition);
  }
`;

const CategoricalHeader = styled(Header)<{ disabled: boolean }>`
  padding: calc(var(--global-space-margin));
  padding-bottom: calc(var(--global-space-y-margin) / 3);
  position: sticky;
  top: 0;
  background-color: var(--global-color-bg);
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  ${({ disabled }) =>
    !disabled &&
    `
  &:hover {
    ${ArrowWrapper} {
      svg {
        color: var(--global-color-font);
      }
    }
  }
  `}
`;

const Option = styled.div<{ selected: boolean; disabled: boolean }>`
  transition: var(--global-transition);
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  padding: calc(var(--global-space-margin));

  ${({ disabled, selected }) =>
    !disabled &&
    `
  &:hover {
    ${Label} {
      color: ${selected ? "inherit" : "var(--color-bright-indigo)"};
    }

    ${ArrowWrapper} {
      svg {
        color: var(--global-color-font);
      }
    }
  }
  `}

  background-color: ${({ selected }) =>
    selected ? "var(--color-bright-indigo)" : "transparent"};
`;

const ICON_SIZE = 20;

const MultiLevelSelect: React.FC<{
  fieldId: string;
  options: Array<Option>;
  disabled: boolean;
  onChange: (value: string) => void;
  value: string;
  invalid: boolean;
}> = ({ fieldId, options, disabled, onChange, value, invalid }) => {
  // Should an option with sub-options be displayed as a category containing those sub-options?
  const [asCategory, setAsCategory] = useState<Option | null>(null);
  const [previousCategory, setPreviousCategory] = useState<Option | null>(null);

  useEffect(() => {
    if (asCategory && !!asCategory?.subOptions) {
      // position list to start at first option
      document
        .getElementById(`${fieldId}-${asCategory?.subOptions[0].value}`)
        ?.scrollIntoView({ behavior: "auto", block: "center" });
    }
  }, [asCategory]);

  useEffect(() => {
    if (previousCategory) {
      // position list to start at first option
      document
        .getElementById(`${fieldId}-${previousCategory.value}`)
        ?.scrollIntoView({ behavior: "auto", block: "center" });
    }
  }, [previousCategory]);

  const handleOptionClick = (option: Option) => {
    if (disabled) return;
    // Does this option have sub-options?
    if (!!option?.subOptions) {
      // YES: Are these sub-options already displayed?
      if (asCategory?.value === option.value) closeSubOptions(option);
      else openSubOptions(option);
    } else {
      // No: set value
      onChange(option.value);
    }
  };

  const openSubOptions = (option: Option) => {
    if (disabled) return;
    // sanity check
    if (!option.subOptions) return;
    // unset any selected value
    onChange("");
    setAsCategory(option);
  };

  const closeSubOptions = (currentOption: Option) => {
    if (disabled) return;
    onChange(""); // unset any selected value
    setAsCategory(null);
    setPreviousCategory(currentOption);
  };

  // Should root options or sub options be displayed?
  const displayOptions = asCategory?.subOptions || options;

  return (
    <Container disabled={disabled} invalid={invalid}>
      {asCategory && (
        <CategoricalHeader
          onClick={() => closeSubOptions(asCategory)}
          disabled={disabled}
        >
          <Label>{asCategory.label}</Label>
          <ArrowWrapper>
            <ArrowLeftCircled height={ICON_SIZE} width={ICON_SIZE} />
          </ArrowWrapper>
        </CategoricalHeader>
      )}
      {displayOptions.map((option) => {
        const key = `${fieldId}-${option.value}`;
        return (
          <Option
            key={key}
            id={key}
            onClick={() => handleOptionClick(option)}
            selected={value === option.value}
            disabled={disabled}
          >
            <Header>
              <Label>{option.label}</Label>
              <ArrowWrapper>
                {Boolean(option.subOptions) && (
                  <ArrowRightCircled height={ICON_SIZE} width={ICON_SIZE} />
                )}
              </ArrowWrapper>
            </Header>
            <Description>{option.description}</Description>
          </Option>
        );
      })}
    </Container>
  );
};

export default MultiLevelSelect;
export type { Option };
