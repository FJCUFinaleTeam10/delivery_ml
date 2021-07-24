import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from './osm-provider';
import { makeStyles } from "@material-ui/core/styles";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const useStyles = makeStyles((theme) => ({
  map: {
    height: `90vh`,
  },
}));

export default function LeafletMap() {
  const classes = useStyles();
  const [statuses, setstatuses] = useState([]);
  const hanoi = [21.028511, 105.804817];
  const center = statuses.length ? [statuses[0].lat, statuses[0].long] : hanoi;
  const zoom = 10;
  return (
      <MapContainer
        className={classes.map}
        center={center}
        zoom={zoom}
        center={center}
        zoom={zoom}
      >
        <TileLayer
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zoomControl="false"
          maxZoom="28"
        />
      </MapContainer>
  );
}
