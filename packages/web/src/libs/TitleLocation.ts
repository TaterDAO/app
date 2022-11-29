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
    coordinatesStringToFeatures(value);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Deserializes a coordinate string into an array of valid GeoJson Features.
 * @param coordinates String containing one or more features joined by semicolons.
 * For example:
 *  -100,50,-100,20,50,70,60,40;2,4,6,8,10,12,-20
 * @returns Array of features.
 */
export function coordinatesStringToFeatures(
  coordinates: string
): Array<Feature> {
  return coordinates.split(";").map((coords) => {
    const positions: Array<Position> = [];
    const coordArr = coords.split(",");

    // Sanity check: each coordinate string should be of even length.
    if (coordArr.length % 2 != 0)
      throw new Error("corrupted coordinate string");

    for (let index = 0; index < coordArr.length; index += 2) {
      const lng = parseFloat(coordArr[index]);
      const lat = parseFloat(coordArr[index + 1]);
      positions.push([lng, lat]);
    }
    return turf.polygon([positions]);
  });
}

export function getPolygonCenter(polygon: Feature): Position {
  //@ts-ignore
  const center = turf.center(polygon.geometry);
  return center.geometry.coordinates;
}
