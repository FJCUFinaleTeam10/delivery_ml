import React, { useState, useRef } from "react";
import {Map,TileLayer} from "react-leaflet";
import osm from './osm-provider';

export default function LeafletMap(){
    const [center, setCenter] = useState({lat:13.084622,lon:80.24835});
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();
    return(
        <Map
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        >
            <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
            >
            </TileLayer>
        </Map>
    )
}
