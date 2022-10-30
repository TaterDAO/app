// Components
import { Row, ErrorMessage } from "@components/ui/Form";
import InputMeta from "./InputMetadata";
import Map from "@components/Map";

// Types
import type { GenericFormState } from "@T/Form";
import type { DrawEvent } from "@components/Map";
import type { Polygon, Position } from "geojson";
import type { Result } from "@mapbox/mapbox-gl-geocoder";
import type { Features } from "@T/geojson";

// Hooks
import { useState, useEffect, useMemo } from "react";

// Utils
import { reduceFeaturesToString } from "@libs/TitleLocation";

const MapInput: React.FC<{
  form: GenericFormState;
  fieldId: string;
  label: string;
  description: string;
}> = ({ form, fieldId, label, description }) => {
  // STATE
  // Inputted value can either by a set of features (polygons) or a
  // lat,lng coordinate point.

  const [features, setFeatures] = useState<Features>({});
  const [point, setPoint] = useState<{ lng: number; lat: number } | null>(null);

  // Parse state to determine a single inputted value.
  const value = useMemo(
    () =>
      point
        ? `${point.lat}, ${point.lng}`
        : Object.values(features).length
        ? reduceFeaturesToString(features)
        : "",
    [features, point]
  );

  /**
   * Update form state when feature(s) or point is selected.
   */
  useEffect(() => {
    form.setValue(fieldId, value);
    // Do not throw error until user submits the form.
    if (value) form.validateField(fieldId, value);
  }, [value]);

  // EVENT HANDLERS

  const handleMapDraw = (e: DrawEvent) => {
    for (const feature of e.features) {
      const id = feature.id as string;

      setFeatures((prevState) => {
        if (e.type === "draw.delete") {
          const newState = { ...prevState };
          delete newState[id];
          return newState;
        } else {
          return {
            ...prevState,
            [id]: (feature.geometry as Polygon).coordinates
          };
        }
      });

      // Unset any point values
      setPoint(null);
    }
  };

  const handleGeocoderSelection = (result: Result) => {
    setPoint({
      lng: result.geometry.coordinates[1],
      lat: result.geometry.coordinates[0]
    });

    // Unset any feature values
    setFeatures({});
  };

  // RENDER

  return (
    <Row>
      <InputMeta
        form={form}
        fieldId={fieldId}
        label={label}
        description={description}
      />
      <Map
        onDraw={handleMapDraw}
        onGeocoderSelection={handleGeocoderSelection}
      />
      {Boolean(form.errors[fieldId]) && (
        <ErrorMessage>No location selected</ErrorMessage>
      )}
    </Row>
  );
};

export default MapInput;
