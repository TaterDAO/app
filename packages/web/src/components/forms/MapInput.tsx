// Components
import { Row, ErrorMessage } from "@components/ui/Form";
import InputMeta from "./InputMetadata";
import Map from "@components/Map";

// Types
import type { MintFormContext } from "@T/Form";
import type { DrawEvent } from "@components/Map";
import type { Result } from "@mapbox/mapbox-gl-geocoder";
import type { Location } from "@contexts/mint/types";

// Hooks
import { useEffect } from "react";

const MapInput: React.FC<{
  form: MintFormContext;
  fieldId: string;
  label: string;
  description: string;
  value: Location;
  onChange: (value: Location) => void;
}> = ({ form, fieldId, label, description, value, onChange }) => {
  // EFFECTS

  /**
   * Throw an error if no value is provided.
   */
  useEffect(() => {
    if (!!value) form.validateField(fieldId, value);
  }, [value]);

  // EVENT HANDLERS

  const handleMapDraw = (e: DrawEvent) => {
    const prevState = value;
    // Default feature set
    let features =
      prevState && prevState.type === "FeatureCollection"
        ? prevState.features
        : [];
    if (e.type == "draw.create") {
      features = [...features, ...e.features];
    } else if (e.type == "draw.update") {
      e.features.forEach((updatedFeature) => {
        features.forEach((feature, index) => {
          if (updatedFeature.id == feature.id) {
            features[index] = updatedFeature;
          }
        });
      });
    } else if (e.type == "draw.delete") {
      const filterIds = e.features.map((f) => f.id);
      features = features.filter((feature) => !filterIds.includes(feature.id));
    }

    // If last polygon is deleted, features will be an empty array.
    onChange(
      features.length
        ? {
            type: "FeatureCollection",
            features
          }
        : undefined
    );
  };

  const handlePointSelection = (result: Result) => {
    const [lat, lng] = result.geometry.coordinates;
    onChange({
      type: "Point",
      coordinates: [lng, lat]
    });
  };

  // RENDER

  return (
    <Row>
      <InputMeta
        fieldId={fieldId}
        label={label}
        description={description}
        required={form.requiredFields.includes(fieldId)}
      />
      <Map
        onDraw={handleMapDraw}
        onGeocoderSelection={handlePointSelection}
        value={value}
      />
      {Boolean(form.errors[fieldId]) && (
        <ErrorMessage>No location selected</ErrorMessage>
      )}
    </Row>
  );
};

export default MapInput;
