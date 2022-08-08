// Components
import MultiLevelSelectInput from "@components/forms/MultiLevelSelectInput";

// Hooks
import useMintForm from "../useMintForm";

// Data
import landClassifications from "@data/classifications/land";

const LandClassificationInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <MultiLevelSelectInput
      form={form}
      fieldId="attrLandClassification_"
      label="Land Classification"
      description=""
      placeholder=""
      options={landClassifications}
    />
  );
};

export default LandClassificationInput;
