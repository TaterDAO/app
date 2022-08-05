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
      options={buildingClassifications}
    />
  );
};

export default BuildingClassificationInput;
