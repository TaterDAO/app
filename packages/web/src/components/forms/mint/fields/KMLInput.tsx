// Components
import BaseFileInput from "@components/forms/BaseFileInput";

// Hooks
import useMintForm from "../useMintForm";
import { useRef } from "react";

// libs
import { kml as makeKML } from "@tmcw/togeojson";

const FIELD_ID = "attrKml_";

// Context
import { ActionType } from "@contexts/mint/types";

const KMLInput: React.FC<{}> = ({}) => {
  const form = useMintForm();
  const el = useRef<HTMLInputElement>(null);

  const handleUpload = async (
    file: File,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // Parse Geojson from XML
    const reader = new FileReader();
    reader.onload = (_event) => {
      try {
        // Use coordinates to set Location value
        const xml = _event.target?.result as string;
        const kml = makeKML(new DOMParser().parseFromString(xml, "text/xml"));

        // Update location
        form.dispatch({
          type: ActionType.SetLocation,
          value: {
            type: "FeatureCollection",
            //@ts-ignore
            features: kml.features
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
