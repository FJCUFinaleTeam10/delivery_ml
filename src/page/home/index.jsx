import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Container,
        makeStyles,
      } from "@material-ui/core";

import LeafletMap from "../../component/leaflet.jsx";
import  driverApi from '../../services/driverApi';
import  restaurantApi from '../../services/restaurantApi';
import CircularLoading from '../../component/CircularLoading';
import geolocationApi from "../../services/geolocationApi";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocalShippingIcon from "../../asset/images/truck.svg";
import storeIcon from "../../asset/images/store.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../component/TrackingTab";
import TrackingTab from "../../component/TrackingTab";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import orderApi from "../../services/orderApi.js";
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
  },
}));

  const center = {
    Latitude: 51.505,
    Longitude: -0.09,
  };
  const zoom = 13;
export default function Home() {

  const [restaurantList,setRestaurantList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [orderList,setOrderList] = useState([]);
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCity,setSelectedCity] = useState({
    Latitude: 23.553118,
    Longitude: 121.0211024,
  });
  const [map, setMap] = useState(null);
  const [zoom,setZoom] = useState(10);
  const [currentTrackingTab,setCurrentTrackingTab] = useState(0);
  useEffect(() => {
      async function fetchCity(){
        const response = await geolocationApi.getAllCity();
        setCityList(response);
      };
      fetchCity();
  }, []);

  useEffect(() => {
    setSelectedCity(cityList[0]);
  }, [cityList]);
    useEffect(() => {
      console.log(orderList);
    }, [orderList]);

  useEffect(() => {
    async function getRestaurantBaseOnCity() {
      try {
        const params = {
          city: selectedCity.City,
        };
        const response = await restaurantApi.getRestaurantBaseOnCity(params);
        setRestaurantList(response);
      } catch (e) {
        console.log(e);
      }
    }
    async function getDriverBaseOnCity() {
      try {
        const params = {
          city: selectedCity.City,
        };
        const response = await driverApi.getDriverBaseOnCity(params);
        setDriverList(response);
      } catch (e) {
        console.log(e);
      }
    }
    async function getOrderBaseOnCity() {
      try {
        const params = {
          city: selectedCity.City,
        };
        const response = await orderApi.getOrderBaseOnCity(params);
        setOrderList(response);
      } catch (e) {
        console.log(e);
      }
    }
    getRestaurantBaseOnCity();
    getDriverBaseOnCity();
    getOrderBaseOnCity();
  }, [selectedCity]);


const handleChangeCity = (e)=>{
    var filterCity = cityList.filter(function (el) {
      return (el.City === e.target.value);
  });
    setSelectedCity(filterCity[0]);
  }
   const handleChangeTrackingTab = (event, newValue) => {
     setCurrentTrackingTab(newValue);
   };
  const handleClickTrackingTabItem = (event, index) => {
        if (index === selectedIndex) {
          setSelectedIndex(null);
        } else {
          setSelectedIndex(index);
        }
      };



    const renderSelectCity = () => {
      return (
        <div>
          <TextField
            id="standard-select-currency"
            select
            label="Select city"
            value={selectedCity.City}
            onChange={handleChangeCity}
            helperText="Please select your city"
          >
            {cityList.map((city) => (
              <MenuItem key={city.id} value={city.City}>
                {city.City}
              </MenuItem>
            ))}
          </TextField>
          <LeafletMap
            driverList={driverList}
            restaurantList={restaurantList}
            orderList={orderList}
            centerCity={selectedCity}
          />
          <TrackingTab
            orderList={orderList}
            driverList={driverList}
            restaurantList={restaurantList}
            selectedIndex={selectedIndex}
            handleClickTrackingTabItem={handleClickTrackingTabItem}
            currentTrackingTab={currentTrackingTab}
            handleChangeTrackingTab={handleChangeTrackingTab}
          />
        </div>
      );
     };
  return (
    <div style={{ position: "relative" }}>
      {cityList.length > 0 && selectedCity !== undefined ? (
        renderSelectCity() 
      ) : (
        <CircularLoading />
      )}
    </div>
  );
}
