// Hooks
import { useRef, useEffect, useState } from "react";

// Services
import mapbox from "@services/Mapbox";

// Libs
import styled from "styled-components";

const MapContainer = styled.div`
  height: 400px;
  width: 100%;

  .mapboxgl-ctrl-attrib-inner {
    display: none;
  }
`;

const Map: React.FC<{}> = ({}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapbox.Map>();
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapbox.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom
    });
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
