import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import osm from './osm-provider';
import { makeStyles } from "@material-ui/core/styles";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocalShippingIcon from "../asset/images/truck.svg";
import storeIcon from "../asset/images/store.png";
import CardTravelIcon from "../asset/images/sent.svg";
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
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function LeafletMap(props) {
  const classes = useStyles();
  const zoom = 10;
  const {restaurantList} = props;
  const {driverList} = props;
  const {orderList } = props;
  const {centerCity} = props;
  const iconTruck = new L.Icon({
    iconUrl: LocalShippingIcon,
    iconSize: new L.Point(60, 75),
  });
  const iconRestaurant = new L.Icon({
    iconUrl: storeIcon,
    iconSize: new L.Point(60, 75),
  });
  const iconOrder = new L.Icon({
    iconUrl: CardTravelIcon,
    iconSize: new L.Point(60, 75),
  });

  const renderVehicles =() =>{
    if (driverList.length>0) {
        return driverList.map(
          (v) =>
            v.Latitude &&
            v.Longitude && (
              <Marker
                icon={iconTruck}
                // icon={iconOrder}
                position={[v.Latitude, v.Longitude]}
              />
            )
        );  
    }
         
  };
    const renderRestaurants =() => {
      if (restaurantList.length > 0) {
        return restaurantList.map(
          (v) =>
            v.Latitude &&
            v.Longitude && (
              <Marker
                icon={iconRestaurant}
                position={[v.Latitude, v.Longitude]}
              />
            )
        );
      }

    };
        const renderOrder = () => {
          if (orderList.length > 0) {
            return orderList.map(
              (o) =>
                o.order_customer_Latitude &&
                o.order_customer_Longitude && (
                  <Marker
                    icon={iconOrder}
                    position={[
                      o.order_customer_Latitude,
                      o.order_customer_Longitude,
                    ]}
                  />
                )
            );
          }
        };
  return (
    <MapContainer
      className={classes.map}
      center={[centerCity.Latitude, centerCity.Longitude]}
      zoom={zoom}
    >
      <ChangeView
        center={[centerCity.Latitude, centerCity.Longitude]}
        zoom={zoom}
      />
      <TileLayer
        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        zoomControl="false"
        maxZoom="28"
      />
      {renderVehicles()}
      {renderRestaurants()}
      {renderOrder()}
    </MapContainer>
  );
}
