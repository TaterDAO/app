// Hooks
import { useRef, useEffect, useState } from "react";

// Services
import mapbox, { geocoder } from "@services/Mapbox";

// Libs
import styled from "styled-components";

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
`;

const Map: React.FC<{
  defaultLng: number;
  defaultLat: number;
  defaultZoom: number;
}> = ({ defaultLng = -70.9, defaultLat = 42.35, defaultZoom = 9 }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapbox.Map>();
  const [lng, setLng] = useState(defaultLng);
  const [lat, setLat] = useState(defaultLat);
  const [zoom, setZoom] = useState(defaultZoom);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapbox.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom
    });

    // Add geocoder
    map.current.addControl(geocoder);
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
