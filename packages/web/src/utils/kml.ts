// Utils
import { kml } from "@tmcw/togeojson";
// Types
import type { FeatureCollection, Feature, Geometry } from "geojson";

// Parses a KML file into a GeoJSON object.
export function kmlToGeoJson(val: XMLDocument): object {
  const geojson = kml(val);

  // Check whether the FeatureCollection contains any GeometryCollections.
  // This is invalid – each member of a FeatureCollection must be a feature –
  // and will need to be corrected.
  if (geojson.type === "FeatureCollection") {
    geojson as FeatureCollection;
    let deserializedFeatures: Array<Feature<Geometry>> = [];

    geojson.features.forEach((feature) => {
      if (feature.geometry.type === "GeometryCollection") {
        const discreteFeatures = feature.geometry.geometries.map(
          (geometry, index) => ({
            id: `${feature.id}_${index}`,
            type: "Feature",
            properties: feature.properties,
            geometry
          })
        ) as Array<Feature<Geometry>>;

        deserializedFeatures = [...deserializedFeatures, ...discreteFeatures];
      } else {
        deserializedFeatures.push(feature);
      }
    });

    return { ...geojson, features: deserializedFeatures };
  } else {
    return geojson;
  }
}
