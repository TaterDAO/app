import { validateNetworkArg } from "../src/cli";
import algolia from "../src/algolia";
import { Geocoding } from "../src/mapbox";

// Types
import type { Feature } from "@turf/turf";
import type { Position } from "geojson";

// Libs
import * as turf from "@turf/turf";

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

(async () => {
  console.log("Geocoding Locations");

  const args = process.argv.slice(2);
  const network = validateNetworkArg(args[0]);
  const index = algolia.initIndex(`titles-${network}`);

  // Query all results
  let results: Array<any> = [];
  await index.browseObjects({
    query: "",
    filters: "NOT location.human OR NOT location.coordinates",
    attributesToRetrieve: ["attr.Location"],
    batch: (hits) => {
      results = [...results, ...hits];
    }
  });

  const withLocation: any = {};

  for await (const result of results) {
    const id = result.objectID as string;
    const location = result["attr.Location"] as string;

    // Is location coordinates?
    const isCoordinates = Geocoding.isCoordinates(location);
    if (isCoordinates) {
      // Get center point of first polygon for reverse search
      const polygons = makePolygons(location);
      const center = turf.center(polygons[0].geometry);
      const coordinates = center.geometry.coordinates;

      withLocation[id] = {
        "location.human": await Geocoding.reverse(
          coordinates[0],
          coordinates[1]
        ),
        "location.coordinates": location
      };
    } else {
      withLocation[id] = {
        "location.human": location,
        "location.coordinates": await Geocoding.forward(location)
      };
    }
  }
})();
