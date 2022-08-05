// Components
import MultiLevelSelectInput from "@components/forms/MultiLevelSelectInput";

// Hooks
import useMintForm from "../useMintForm";

// Data
import buildingClassifications from "@data/classifications/building";

const BuildingClassificationInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <MultiLevelSelectInput
      form={form}
      fieldId="attrBuildingClassification_"
      label="Building Classification"
      description=""
      placeholder=""
      options={[
        {
          value: "no_building",
          label: "No Building",
          description: "No building."
        },
        ...buildingClassifications
      ]}
    />
  );
};

export default BuildingClassificationInput;
