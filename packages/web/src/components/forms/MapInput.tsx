// Components
import { Row, ErrorMessage } from "@components/ui/Form";
import InputMeta from "./InputMetadata";
import Map from "@components/Map";

// Types
import type { GenericFormState } from "@T/Form";
import type { DrawEvent } from "@components/Map";
import type { Polygon, Position } from "geojson";

// Hooks
import { useState, useEffect, useMemo } from "react";

const MapInput: React.FC<{
  form: GenericFormState;
  fieldId: string;
  label: string;
  description: string;
}> = ({ form, fieldId, label, description }) => {
  const hasError = Boolean(form.errors[fieldId]);

  const [polygons, setPolygons] = useState<{
    [boundBoxId: string]: Position[][];
  }>({});
  const boxCount = Object.keys(polygons).length;

  const [interacted, setInteracted] = useState<boolean>(false);

  const mergedCoordinateValue = useMemo(
    () =>
      Object.values(polygons)
        .map((coordinates) => coordinates.toString())
        .join(";"),
    [polygons]
  );

  useEffect(() => {
    // Don't prematurely show the error message
    if (!interacted) return;

    form.setValue(fieldId, mergedCoordinateValue);
    form.validateField(fieldId, mergedCoordinateValue);
  }, [interacted, mergedCoordinateValue]);

  useEffect(() => {
    if (boxCount > 0) setInteracted(true);
  }, [boxCount]);

  const handleMapDraw = (e: DrawEvent) => {
    for (const feature of e.features) {
      const id = feature.id as string;

      setPolygons((prevState) => {
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

  return (
    <Row>
      <InputMeta
        form={form}
        fieldId={fieldId}
        label={label}
        description={description}
      />
      <Map onDraw={handleMapDraw} />
      {hasError && <ErrorMessage>Coordinates required</ErrorMessage>}
    </Row>
  );
};

export default MapInput;
