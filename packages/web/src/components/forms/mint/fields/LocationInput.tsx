// Components
import MapInput from "@components/forms/MapInput";

// Hooks
import useMintForm from "../useMintForm";

// Context
import { ActionType } from "@contexts/mint/types";
import type { Location } from "@contexts/mint/types";

const LocationInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <MapInput
      form={form}
      fieldId="attrLocation_"
      label="Location"
      description="Search for an address or select the coordinates of your parcel(s) using the Polygon tool."
      value={form.state.attrLocation_}
      onChange={(value: Location) =>
        form.dispatch({ type: ActionType.SetLocation, value })
      }
    />
  );
};

export default LocationInput;
