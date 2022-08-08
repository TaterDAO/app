// Hooks
import { useRef, useEffect, useState } from "react";

// Services
import mapbox, { geocoder, draw } from "@services/Mapbox";

// Libs
import styled from "styled-components";

// Types
import type {
  DrawCreateEvent,
  DrawDeleteEvent,
  DrawUpdateEvent
} from "@mapbox/mapbox-gl-draw";

type DrawEvent = DrawCreateEvent | DrawDeleteEvent | DrawUpdateEvent;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
  max-width: 650px;
  position: relative;
`;

/**
 * Renders a Mapbox map.
 * @param props.defaultLng Initial longitude on render.
 * @param props.defaultLat Initial latitude on render.
 * @param props.defaultZoom Initial zoom on render.
 * @param props.onDraw Handler for draw events.  If not passed, drawing will not be enabled.
 * @param props.displaySearch Should search input be displayed?
 */
const Map: React.FC<{
  defaultLng?: number;
  defaultLat?: number;
  defaultZoom?: number;
  onDraw?: (e: DrawEvent) => void | null;
  displaySearch?: boolean;
}> = ({
  defaultLng = -70.9,
  defaultLat = 42.35,
  defaultZoom = 9,
  onDraw = null,
  displaySearch = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapbox.Map>();
  const [lng, setLng] = useState(defaultLng);
  const [lat, setLat] = useState(defaultLat);
  const [zoom, setZoom] = useState(defaultZoom);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapbox.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: zoom
    });

    // Geocoder should be displayed first in the top-most right corner.
    if (displaySearch) {
      map.current.addControl(geocoder());
    }

    map.current.addControl(new mapbox.NavigationControl());

    if (!!onDraw) {
      map.current.addControl(draw(), "top-right");
      map.current.on("draw.create", onDraw);
      map.current.on("draw.delete", onDraw);
      map.current.on("draw.update", onDraw);
    }
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return <MapContainer ref={mapContainer} />;
};

export default Map;
export type { DrawEvent };
