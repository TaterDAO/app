//@ts-ignore
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

/* Given a query in the form "lng, lat" or "lat, lng"
 * returns the matching geographic coordinate(s)
 * as search results in carmen geojson format,
 * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md */
const coordinatesGeocoder = function (query: string) {
  // Match anything which looks like
  // decimal degrees coordinate pair.
  const matches = query.match(
    /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
  );
  if (!matches) {
    return null;
  }

  function coordinateFeature(lng: number, lat: number) {
    return {
      center: [lng, lat],
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      },
      place_name: "Lat: " + lat + " Lng: " + lng,
      place_type: ["coordinate"],
      properties: {},
      type: "Feature"
    };
  }

  const coord1 = Number(matches[1]);
  const coord2 = Number(matches[2]);
  const geocodes = [];

  if (coord1 < -90 || coord1 > 90) {
    // must be lng, lat
    geocodes.push(coordinateFeature(coord1, coord2));
  }

  if (coord2 < -90 || coord2 > 90) {
    // must be lat, lng
    geocodes.push(coordinateFeature(coord2, coord1));
  }

  if (geocodes.length === 0) {
    // else could be either lng, lat or lat, lng
    geocodes.push(coordinateFeature(coord1, coord2));
    geocodes.push(coordinateFeature(coord2, coord1));
  }

  return geocodes;
};

function geocoder(acceptsCoordinates: boolean = true): MapboxGeocoder {
  const coordinatesConfig = acceptsCoordinates
    ? {
        localGeocoder: coordinatesGeocoder,
        zoom: 18,
        placeholder: "Search (e.g. -40, 170)",
        reverseGeocode: true
      }
    : {};

  //@ts-ignore
  return new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    ...coordinatesConfig
  });
}

function draw(): MapboxDraw {
  return new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true
    }
  });
}

export default mapboxgl;
export { geocoder, draw };
