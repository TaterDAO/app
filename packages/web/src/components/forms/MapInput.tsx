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
  // STATE: UI
  const hasError = Boolean(form.errors[fieldId]);
  const [interacted, setInteracted] = useState<boolean>(false);

  // STATE: Each feature is a polygon
  const [features, setFeatures] = useState<Features>({});
  const boxCount = Object.keys(features).length;

  const mergedCoordinateValue = useMemo(
    () => reduceFeaturesToString(features),
    [features]
  );

  // STATE: Point
  const [point, setPoint] = useState<{ lng: number; lat: number } | null>(null);
  const pointSelected = point != null;
  const pointString = pointSelected ? `${point.lat}, ${point.lng}` : "";

  // EFFECTS

  /**
   * When point or polygon state is set, set interacted as true.
   */
  useEffect(() => {
    if (boxCount > 0 || pointSelected) setInteracted(true);
  }, [boxCount, pointSelected]);

  /**
   * Update form state when coordinates change.
   */
  useEffect(() => {
    // Don't prematurely show the error message
    if (!interacted) return;

    form.setValue(fieldId, mergedCoordinateValue);
    form.validateField(fieldId, mergedCoordinateValue);
  }, [interacted, mergedCoordinateValue]);

  useEffect(() => {
    // Don't prematurely show the error message
    if (!interacted) return;

    form.setValue(fieldId, pointString);
    form.validateField(fieldId, pointString);
  }, [interacted, pointString]);

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
    }
  };

  const handleGeocoderSelection = (result: Result) => {
    setPoint({
      lng: result.geometry.coordinates[1],
      lat: result.geometry.coordinates[0]
    });
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
      {hasError && <ErrorMessage>No location selected</ErrorMessage>}
    </Row>
  );
};

export default MapInput;
