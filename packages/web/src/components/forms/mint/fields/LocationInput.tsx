// Components
import MapInput from "@components/forms/MapInput";

// Hooks
import useMintForm from "../useMintForm";

const LocationInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <MapInput
      form={form}
      fieldId="attrLocation_"
      label="Location"
      description="Search for an address or select the coordinates of your parcel(s) using the Polygon tool."
    />
  );
};

export default LocationInput;
