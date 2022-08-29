// Types
import type { Feature } from "@turf/turf";
import type { Position } from "geojson";

// Libs
import * as turf from "@turf/turf";

function isCoordinates(value: string): boolean {
  const re = new RegExp(/[a-z]+/);
  return !re.test(value);
}

function isPolygon(value: string): boolean {
  try {
    makePolygons(value);
    return true;
  } catch (error) {
    return false;
  }
}

function makePolygons(coordinateString: string): Array<Feature> {
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

function getPolygonCenter(polygon: Feature): Position {
  const center = turf.center(polygon.geometry);
  return center.geometry.coordinates;
}

export { isCoordinates, makePolygons, getPolygonCenter, isPolygon };
