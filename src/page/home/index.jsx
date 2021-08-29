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
  // const center = [51.505, -0.09];
  const zoom = 13;
export default function Home() {

  const [restaurantList,setRestaurantList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);
  const [selectedCity,setSelectedCity] = useState({
    Latitude: 23.553118,
    Longitude: 121.0211024,
  });
  const [map, setMap] = useState(null);
  const [zoom,setZoom] = useState(10);

  useEffect(() => {
      async function fetchCity(){
        const response = await geolocationApi.getAllCity();
        setCityList(response);
      };
      fetchCity();
      // console.log([selectedCity.Latitude,selectedCity.Longitude]);
  }, []);

  useEffect(() => {
    setSelectedCity(cityList[0]);
  }, [cityList]);

  useEffect(() => {
    console.log(selectedCity);
     async function getRestaurantBaseOnCity(){
      try {
        const params = {
          city: selectedCity.City,
        };
        const response = await restaurantApi.getRestaurantBaseOnCity(params);
        setRestaurantList(response);
      } catch (e) {
        console.log(e);
      }
    };
     async function getDriverBaseOnCity(){
      try {
        const params = {
          city: selectedCity.City,
        };
        const response = await driverApi.getDriverBaseOnCity(params);
        setDriverList(response);
      } catch (e) {
        console.log(e);
      }
    };
    getRestaurantBaseOnCity();
    getDriverBaseOnCity();
    console.log(driverList);
    console.log(restaurantList);
  }, [selectedCity]);

  useEffect(() =>{
    console.log(driverList);
    console.log(restaurantList)
  },driverList,restaurantList);

const handleChangeCity = (e)=>{
    var filterCity = cityList.filter(function (el) {
      return (el.City === e.target.value);
  });
    setSelectedCity(filterCity[0]);
  }



    const renderSelectCity = () => {
      return (
        <div>
          <TextField
            id="standard-select-currency"
            select
            label="Select city"
            value={selectedCity.City}
            onChange={handleChangeCity}
            helperText="Please select your currency"
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
               centerCity={selectedCity}
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
