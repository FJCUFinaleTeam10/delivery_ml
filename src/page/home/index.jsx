import React, { useEffect, useState } from "react";
import { Container,
        makeStyles,
      } from "@material-ui/core";

import LeafletMap from "../../component/leaflet.jsx";
import  driverApi from '../../services/driverApi';
import  restaurantApi from '../../services/restaurantApi';
import CircularLoading from '../../component/CircularLoading';
import geolocationApi from "../../services/geolocationApi";

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

export default function Home() {
  const [restaurantList,setRestaurantList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const classes = useStyles();
  const [cityList,setCityList] = useState([]);
  const [selectedCity,setSelectedCity] = useState();
  useEffect(() => {
    setInterval(() => {
      fetch_city();
      fetchDriverList();
      fetchRestaurantList();
      
    }, 5000); // 5s
    
  }, []);
    const fetchRestaurantList = async () => {
      try {
        const params = {
            limit:10,
            skip:0,
        };
        const response = await restaurantApi.getAll(params);
        setRestaurantList(response);
        
      } catch (e) {
        console.log(e);
      }
    };
    const fetch_city = async ()=>{
      const response = await geolocationApi.getAll();
      setCityList(response);

    }
    const fetchDriverList = async () => {
          try {
            const response = await driverApi.getAll();
            setDriverList(response);
          } catch (e) {
            console.log(e);
          }
        };
    const renderMap = () => {
      console.log(driverList.length);
      return(
      <LeafletMap
        driverList={driverList}
        restaurantList={restaurantList}
        />
      );
     };
  return (
    <div style={{ position: "relative" }}>
      {driverList.length>0?(
        renderMap()
      ):(
        <CircularLoading/>
      )}

    </div>
  );
}
