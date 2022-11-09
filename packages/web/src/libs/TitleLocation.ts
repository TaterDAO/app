// Types
import type { Position, Feature } from "geojson";

// Libs
import * as turf from "@turf/turf";

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
  //@ts-ignore
  const center = turf.center(polygon.geometry);
  return center.geometry.coordinates;
}
