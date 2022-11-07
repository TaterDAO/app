// Components
import { Row, ErrorMessage } from "@components/ui/Form";
import InputMeta from "./InputMetadata";
import Map from "@components/Map";

// Types
import type { GenericFormState } from "@T/Form";
import type { DrawEvent } from "@components/Map";
import type { Result } from "@mapbox/mapbox-gl-geocoder";
import type { FeatureCollection, Point } from "geojson";

// Hooks
import { useState, useEffect, useMemo } from "react";

const MapInput: React.FC<{
  form: GenericFormState;
  fieldId: string;
  label: string;
  description: string;
}> = ({ form, fieldId, label, description }) => {
  const [value, setValue] = useState<Point | FeatureCollection | undefined>(
    undefined
  );

  // EFFECTS

  /**
   * Update form state when coordinates change.
   */
  useEffect(() => {
    form.setValue(fieldId, value);
    if (!!value) form.validateField(fieldId, value);
  }, [value]);

  // EVENT HANDLERS

  const handleMapDraw = (e: DrawEvent) => {
    setValue((prevState) => {
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
        features = features.filter(
          (feature) => !filterIds.includes(feature.id)
        );
      }

      return {
        type: "FeatureCollection",
        features
      };
    });
  };

  const handlePointSelection = (result: Result) => {
    const [lat, lng] = result.geometry.coordinates;
    setValue({
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
