import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from './osm-provider';
import { makeStyles } from "@material-ui/core/styles";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocalShippingIcon from "../asset/images/truck.svg";
import storeIcon from "../asset/images/store.png";
const useStyles = makeStyles((theme) => ({
  map: {
    height: `90vh`,
  },
  container: {
    width: `20%`,
    width: `1150px`,
    height: `auto`,
    position: `absolute`,
    bottom: `0`,
    zIndex: `1000`,
    border: `0px solid #fff`,
    backGround: `inherit`,
  },
}));

export default function LeafletMap(props) {
  const classes = useStyles();
  const geoData = [21.028511,105.804817];
  const zoom = 10;
  const {restaurantList} = props;
  const {driverList} = props;

  const center = driverList.length ? [driverList[0].latitude,driverList[0].longitude] : geoData;
  console.log(center);

  const iconTruck = new L.Icon({
    iconUrl: LocalShippingIcon,
    iconSize: new L.Point(60, 75),
  });
  const iconRestaurant = new L.Icon({
    iconUrl: storeIcon,
    iconSize: new L.Point(60, 75),
  });
  const renderVehicles =() =>{
    console.log(driverList);
  return driverList.map(v => v.latitude && v.longitude &&
              <Marker
                icon={iconTruck}
                position={[v.latitude, v.longitude]}
              />
  );           
  };
    const renderRestaurants =() => {
      return restaurantList.map((v) =>v.latitude &&v.longitude && (
            <Marker icon={iconRestaurant} position={[v.latitude, v.longitude]} />
          )
      );
    };
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
      {renderVehicles()}
      {renderRestaurants()}
    </MapContainer>
  );
}
