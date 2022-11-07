// Hooks
import { useRef, useEffect, useState } from "react";

// Services
import mapbox, { geocoder } from "@services/Mapbox";

// Libs
import styled from "styled-components";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { Marker } from "mapbox-gl";
import { getPolygonCenter } from "@libs/TitleLocation";

// Types
import type {
  DrawCreateEvent,
  DrawDeleteEvent,
  DrawUpdateEvent
} from "@mapbox/mapbox-gl-draw";
import type { Result } from "@mapbox/mapbox-gl-geocoder";
import type { Feature } from "@turf/turf";
import type { FeatureCollection, Point } from "geojson";
import type { Location } from "@contexts/mint/types";

type DrawEvent = DrawCreateEvent | DrawDeleteEvent | DrawUpdateEvent;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
  max-width: 650px;
  position: relative;
`;

/**
 * Renders a Mapbox map.
 * @param props.defaultZoom Initial zoom on render.
 * @param props.onDraw Handler for draw events.  If not passed, drawing will not be enabled.
 * @param props.showGeocoder Should search input be displayed?
 */
const Map: React.FC<{
  defaultZoom?: number;
  onDraw?: (e: DrawEvent) => void | null;
  showGeocoder?: boolean;
  defaultBoundingBoxes?: Array<Feature>;
  onGeocoderSelection?: (result: Result) => void;
  value: Location;
}> = ({
  defaultZoom = 9,
  onDraw = null,
  defaultBoundingBoxes = [],
  showGeocoder = true,
  onGeocoderSelection = null,
  value = {
    type: "Point",
    coordinates: [-70.9, 42.35] // lng, lat
  } as Point
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapbox.Map>();
  const draw = useRef<MapboxDraw>();

  // Center on the first bounding box if provided.
  const startingCoords =
    value.type === "FeatureCollection"
      ? //@ts-ignore
        getPolygonCenter((value as FeatureCollection).features[0])
      : (value as Point).coordinates;

  const [lng, setLng] = useState(startingCoords[0]);
  const [lat, setLat] = useState(startingCoords[1]);
  const [zoom, setZoom] = useState(defaultZoom);

  const [loaded, setLoaded] = useState<boolean>(false);

  const [geocoderSelectionMarker, setGeocoderSelectionMarker] =
    useState<Marker | null>(null);

  /**
   * Initialize.
   */
  useEffect(() => {
    if (map.current || draw.current) return; // initialize map only once

    map.current = new mapbox.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom
    });

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: onDraw
        ? {
            polygon: true,
            trash: true
          }
        : undefined
    });

    // Geocoder should be displayed first in the top-most right corner.
    if (showGeocoder) {
      const gc = geocoder();

      if (onGeocoderSelection) {
        gc.on("result", ({ result }: { result: Result }) => {
          onGeocoderSelection(result);

          // Delete any polygons
          draw.current?.deleteAll();

          // Add marker
          const marker = new Marker();
          //@ts-ignore
          marker.setLngLat(result.geometry.coordinates);
          marker.addTo(map.current);
          setGeocoderSelectionMarker(marker);
        });
      }

      map.current.addControl(gc);
    }
    map.current.addControl(new mapbox.NavigationControl());
    map.current.addControl(draw.current, "top-right");

    if (!!onDraw) {
      map.current.on("draw.create", onDraw);
      map.current.on("draw.delete", onDraw);
      map.current.on("draw.update", onDraw);
    }
  });

  /**
   * When value is updated, remove marker.
   */
  useEffect(() => {
    if (!!geocoderSelectionMarker && value.type === "FeatureCollection") {
      geocoderSelectionMarker.remove();
      setGeocoderSelectionMarker(null);
    }
  }, [value, geocoderSelectionMarker]);

  /**
   * Add initial event listeners to map.
   */
  useEffect(() => {
    if (!map.current || loaded) return;

    map.current
      .on("load", () => {
        //@ts-ignore
        defaultBoundingBoxes.forEach((draw.current as MapboxDraw).add);
        setLoaded(true);
      })
      .on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
  }, [map.current, loaded]);

  return <MapContainer ref={mapContainer} />;
};

export default Map;
export type { DrawEvent };
