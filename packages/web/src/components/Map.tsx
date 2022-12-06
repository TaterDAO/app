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

// Components
import Button from "@components/ui/Button";

type DrawEvent = DrawCreateEvent | DrawDeleteEvent | DrawUpdateEvent;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
  max-width: 650px;
  position: relative;
`;

const DEFAULT_COORDINATES = [-70.9, 42.35]; // lng, lat

/**
 * Renders a Mapbox map.
 * @param props.defaultZoom Initial zoom on render.
 * @param props.onDraw Handler for draw events.  If not passed, drawing will not be enabled.
 * @param props.showGeocoder Should search input be displayed?
 * @param props.value Selected or default location.
 * @param props.shouldRenderCenterBtn Should a button that re-centers the map (on the selected location) be rendered?
 */
const Map: React.FC<{
  defaultZoom?: number;
  onDraw?: (e: DrawEvent) => void | null;
  showGeocoder?: boolean;
  defaultBoundingBoxes?: Array<Feature>;
  onGeocoderSelection?: (result: Result) => void;
  value: Location;
  shouldRenderCenterBtn?: boolean;
}> = ({
  defaultZoom = 9,
  onDraw = null,
  defaultBoundingBoxes = [],
  showGeocoder = true,
  onGeocoderSelection = null,
  value = {
    type: "Point",
    coordinates: DEFAULT_COORDINATES
  } as Point,
  shouldRenderCenterBtn = false
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapbox.Map>();
  const draw = useRef<MapboxDraw>();

  // Center on the first bounding box if provided.
  const [centerLng, centerLat] =
    value.type === "FeatureCollection"
      ? //@ts-ignore
        getPolygonCenter((value as FeatureCollection).features[0])
      : (value as Point).coordinates;

  const [lng, setLng] = useState(centerLng);
  const [lat, setLat] = useState(centerLat);
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
    map.current.addControl(
      new mapbox.NavigationControl({
        visualizePitch: true
      })
    );
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
   * When a Feature Collection is added either via the user drawing a polygon or
   * via KML upload, recenter the map on the polygon(s) and ensure that they are
   * drawn on the map (in the case of KML upload).
   */
  useEffect(() => {
    if (draw.current && map.current && value?.type === "FeatureCollection") {
      // Draw polygon
      draw.current?.add(value);
      // Center
      map.current.flyTo({
        center: [centerLng, centerLat],
        essential: true,
        zoom
      });
    }
  }, [map.current, draw.current, value, centerLng, centerLat]);

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

  // Event Handlers

  /**
   * Revert map center to `centerLng` and `centerLat` extracted
   * from `props.value`.
   */
  const handleCentering = () => {
    // Update state
    setLng(centerLng);
    setLat(centerLat);

    // Update map
    map.current.flyTo({
      center: [centerLng, centerLat],
      essential: true,
      zoom
    });
  };

  // Render

  return (
    <>
      <MapContainer ref={mapContainer} />
      {shouldRenderCenterBtn && (
        <Button
          onClick={handleCentering}
          // Future: Track position changes to lng,lat and only enable button on change.
          //disabled={centerLng !== lng || centerLat !== lat}
        >
          Center
        </Button>
      )}
    </>
  );
};

export default Map;
export type { DrawEvent };
