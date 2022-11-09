// Components
import BaseFileInput from "@components/forms/BaseFileInput";

// Hooks
import useMintForm from "../useMintForm";
import { useRef } from "react";

// libs
import { kml as makeKML } from "@tmcw/togeojson";

// utils
import { reduceFeaturesToString } from "@libs/TitleLocation";

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
    const reader = new FileReader();
    reader.onload = (_event) => {
      try {
        // Use coordinates to set Location value
        const xml = _event.target?.result as string;
        const kml = makeKML(new DOMParser().parseFromString(xml, "text/xml"));
        const coordinateString = reduceFeaturesToString(
          kml.features.reduce(
            (memo, feature) => ({
              ...memo,
              //@ts-ignore
              [feature?.id]: feature.geometry?.coordinates
            }),
            {}
          )
        );
        //form.dispatch({ type: ActionType.SetKML, value: e.target.value });
        form.setValue("attrLocation_", coordinateString);
      } catch (error) {
        setError("There was an error processing your KML");
      }

      // TODO: Upload file to Pinata
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    form.setValue(FIELD_ID, "");
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
