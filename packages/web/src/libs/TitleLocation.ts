// Types
import type { Position, Feature, Polygon, Point } from "geojson";

// Libs
import * as turf from "@turf/turf";

export function isCoordinates(value: string): boolean {
  const re = new RegExp(/[a-z]+/);
  return !re.test(value);
}

export function isPolygon(value: string): boolean {
  try {
    deserializeFeatures(value);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Takes an array of Polygon and/or Point Features and returns a coordinate string.
 * @param features
 * @returns Features merged into Polygons/Points x,y,z pairs separated by semicolons.
 */
export function serializeFeatures(features: Array<Feature>): string {
  return features
    .map(({ geometry }: Feature) => {
      // Ensure all Position Z-values are set to 0.
      if (geometry.type === "Point") {
        return `${geometry.coordinates[0]},${geometry.coordinates[1]},0`;
      } else if (geometry.type === "Polygon") {
        return geometry.coordinates[0]
          .map((coordinates) => {
            return `${coordinates[0]},${coordinates[1]},0`;
          })
          .join(",");
      } else {
        //@ts-ignore
        throw new Error(`Unsupported geometry type: ${geometry.type}`);
      }
    })
    .join(";")
    .trim();
}

/**
 * Deserializes a coordinate string into an array of valid GeoJson Features.
 * @param coordinateString String containing one or more Features joined by semicolons.
 * Each feature is serialized with a call to `feature.geometry.coordinates.toString()`.
 * @returns Array of features.
 */
export function deserializeFeatures(coordinateString: string): Array<Feature> {
  // Feature strings are merged on semicolon.
  const features = coordinateString.split(";");

  // `features` will contain 1 or more strings representing either a
  // set of Positions (Polygon) or a single Position (Point).

  return features.map((mergedPositions) => {
    const coordArr = mergedPositions.split(",").map((n) => parseFloat(n));

    // Is `mergedPositions` a single Point?
    if (coordArr.length <= 3) {
      return turf.point(coordArr);
    }

    // Each position must be represented by its own array.
    const positions: Array<Position> = [];

    // Positions may either be encoded as x,y or x,y,z. However z values *should*
    // always be zero as TATRs do not support altitude, etc.
    // Older TATRs will contain this value. Check.
    const hasZ = coordArr[2] === 0;
    // If a Z value is present, it should be skipped.
    const incrementor = hasZ ? 3 : 2;

    for (let index = 0; index < coordArr.length; index += incrementor) {
      const x = coordArr[index];
      const y = coordArr[index + 1];
      positions.push([x, y, 0]);
    }

    return turf.polygon([positions]);
  });
}

export function getPolygonCenter(polygon: Feature): Position {
  //@ts-ignore
  const center = turf.center(polygon.geometry);
  return center.geometry.coordinates;
}
