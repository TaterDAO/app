// Types
import type { Feature } from "@turf/turf";
import type { Position } from "geojson";
import type { Features } from "@T/geojson";

// Libs
import * as turf from "@turf/turf";

/**
 * Given an Features object, reduce each feature's coordinate bounding box
 * into a single coordinates string then combine each coordinate string into
 * a single "merged" string.
 * @param features
 * @returns
 */
export function reduceFeaturesToString(features: Features): string {
  return Object.values(features)
    .map((coordinates) => coordinates.toString())
    .join(";");
}

export function isCoordinates(value: string): boolean {
  const re = new RegExp(/[a-z]+/);
  return !re.test(value);
}

export function isPolygon(value: string): boolean {
  try {
    coordinateStringToFeatureList(value);
    return true;
  } catch (error) {
    return false;
  }
}

export function coordinateStringToFeatureList(
  coordinateString: string
): Array<Feature> {
  return coordinateString.split(";").map((coords) => {
    const coordinatePairs: Array<Position> = [];
    let lat: number;

    coords.split(",").forEach((coord, index) => {
      const n = parseFloat(coord);
      if (index % 2 === 0) {
        lat = n;
      } else {
        const pos = [lat, n];
        coordinatePairs.push(pos);
      }
    });

    return turf.polygon([coordinatePairs]);
  });
}

export function getPolygonCenter(polygon: Feature): Position {
  const center = turf.center(polygon.geometry);
  return center.geometry.coordinates;
}
