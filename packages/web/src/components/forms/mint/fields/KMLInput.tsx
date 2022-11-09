// Components
import TextInput from "../../TextInput";

// Hooks
import useMintForm from "../useMintForm";

// Context
import { ActionType } from "@contexts/mint/types";

const KMLInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <TextInput
      form={form}
      fieldId="attrKml_"
      placeholder=""
      label="KML"
      description=""
      value={form.state.attrKml_}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        form.dispatch({ type: ActionType.SetKML, value: e.target.value })
      }
    />
  );
};

export default KMLInput;
