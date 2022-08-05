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

interface ParentLinkedOption extends Option {
  parent: Option | null;
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
  text-transform: capitalize;
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

function categoricalLabelFromValue(value: string): string {
  value = value.replaceAll("_or_", " / ");
  value = value.replaceAll("_and_", " & ");
  value = value.replaceAll(",", ", ");
  value = value.replaceAll("_", " ");
  return value;
}

const MultiLevelSelect: React.FC<{
  fieldId: string;
  options: Array<Option>;
  disabled: boolean;
  onChange: (value: string) => void;
  value: string;
  invalid: boolean;
}> = ({ fieldId, options, disabled, onChange, value, invalid }) => {
  // Should an option with sub-options be displayed as a category containing those sub-options?
  const [selectedOption, selectOption] = useState<ParentLinkedOption | null>(
    null
  );
  const [previousOptionValue, setPreviousOptionValue] = useState<string>("");

  useEffect(() => {
    if (previousOptionValue) {
      // Going up, scroll to previous value
      document
        .getElementById(`${fieldId}-${previousOptionValue}`)
        ?.scrollIntoView({ behavior: "auto", block: "center" });
    } else if (!!selectedOption?.subOptions) {
      // Going down, scroll to first value
      document
        .getElementById(`${fieldId}-${selectedOption?.subOptions[0].value}`)
        ?.scrollIntoView({ behavior: "auto", block: "center" });
    }

    // When display of sub-options changes, unset value.
    onChange("");
  }, [selectedOption, previousOptionValue]);

  const handleOptionClick = (option: Option) => {
    if (disabled) return;
    else if (
      // Does this option have sub-options?
      !option?.subOptions
    )
      // - NO: set value
      onChange(option.value);
    else if (
      // - YES: Are these sub-options already displayed?
      selectedOption?.value === option.value
    )
      // -- YES: hide sub-options
      displaySiblingOptions();
    // -- NO: Display sub-options
    else displaySubOptions(option);
  };

  // Displays the given sub-options for a category.
  const displaySubOptions = (option: Option) => {
    if (disabled) return;
    selectOption({ ...option, parent: selectedOption });
    setPreviousOptionValue(selectedOption?.value || "");
  };

  /**
   * Hides a category's sub-options and displays its siblings.
   */
  const displaySiblingOptions = () => {
    if (disabled) return;
    selectOption(
      (selectedOption as ParentLinkedOption).parent as ParentLinkedOption
    );
    setPreviousOptionValue(selectedOption?.value || "");
  };

  // Should root options or sub options be displayed?
  const displayOptions = selectedOption?.subOptions || options;

  return (
    <Container disabled={disabled} invalid={invalid}>
      {selectedOption && (
        <CategoricalHeader
          onClick={() => displaySiblingOptions()}
          disabled={disabled}
        >
          <Label>{categoricalLabelFromValue(selectedOption.value)}</Label>
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
