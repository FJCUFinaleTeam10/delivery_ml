import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { MapContainer, Marker, useMap, TileLayer, Popup } from "react-leaflet";

export default function App(props) {
  const [x, setX] = useState(2.3522219);
  const [y, setY] = useState(48.856614);
  
  const [markerDragged, setMarkerDragged] = useState(false);

  const icon = new Leaflet.DivIcon({
    className: "custom-div-icon",
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><i class='material-icons'><img src='https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'></i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [-3, -42],
  });

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  }

  useEffect(() => {
    if (props) {
      setX(props.text.features[0].geometry.coordinates[0]);
      setY(props.text.features[0].geometry.coordinates[1]);
    }
  }, [props]);

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setX(lng);
          setY(lat);
          setMarkerDragged(true);
          props.setCurrentPosition([lat,lng]);
        }
      },
    }),
    []
  );

  const popup = () => {
    if (markerDragged) return `New latitude: ${y}, new longitude: ${x}`;
    return props.text ? props.text.query : "Location Default";
  };

  return (
    <MapContainer
      center={props.currentPosition}
      attributionControl={false}
      zoomControl={false}
      zoom={12}
      style={{
        height: "350px",
        position: "relative",
        outline: "none",
        maxWidth: "696px",
        display: "block",
        margin: "15px auto",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={props.currentPosition}
        icon={icon}
        draggable={"true"}
        ref={markerRef}
        eventHandlers={eventHandlers}
      >
        <Popup>
          <span>{popup()}</span>
        </Popup>
        <SetViewOnClick coords={props.currentPosition} />
      </Marker>
    </MapContainer>
  );
}
