// Components
import BaseFileInput from "@components/forms/BaseFileInput";

// Hooks
import useMintForm from "../useMintForm";
import { useRef } from "react";

// Utils
import { stringToXMLDocument } from "@utils/xml";
import { kmlToGeoJson } from "@utils/kml";

const FIELD_ID = "attrKml_";

// Context
import { ActionType } from "@contexts/mint/types";

const KMLInput: React.FC<{}> = ({}) => {
  const form = useMintForm();
  const el = useRef<HTMLInputElement>(null);

  // ====================================================
  // Handlers
  // ====================================================

  // Given a KML file, parses it and updates the form state.
  // This value is then used to update the map's current position.
  const handleUpload = async (
    file: File,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // Parse Geojson from XML
    const reader = new FileReader();
    reader.onload = (_event) => {
      try {
        const kml = stringToXMLDocument(_event.target?.result as string);
        const geojson = kmlToGeoJson(kml);

        // Update location
        form.dispatch({
          type: ActionType.SetLocation,
          value: {
            type: "FeatureCollection",
            //@ts-ignore
            features: geojson.features
          }
        });
      } catch (error) {
        setError("There was an error processing your KML");
      }
    };
    reader.readAsText(file);

    // Attach file to state
    form.dispatch({
      type: ActionType.SetKML,
      file
    });
  };

  const handleClear = () => {
    form.dispatch({ type: ActionType.UnsetKML });
  };

  return (
    <BaseFileInput
      form={form}
      fieldId={FIELD_ID}
      label="KML"
      description="Optional KML file to parse location from."
      mimeType=".kml"
      acceptMultiple={false}
      handleUpload={handleUpload}
      handleClear={handleClear}
      filePreview={null}
      inputRef={el}
    />
  );
};

export default KMLInput;
