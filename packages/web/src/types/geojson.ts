import type { Polygon, Position } from "geojson";

export type BoundingBox = Position[][];

// Each feature is a bounding box.
export type Features = {
  [featureId: string]: BoundingBox;
};
