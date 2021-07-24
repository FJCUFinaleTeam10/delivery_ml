import React, { useEffect, useState } from "react";
import { Container,
        makeStyles,
      } from "@material-ui/core";

import LeafletMap from "../../component/leaflet.jsx";
import  driverApi from '../../services/driverApi';
import  restaurantApi from '../../services/restaurantApi';



const useStyles = makeStyles((theme) => ({
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

export default function Home() {
  const [restaurantList,setRestaurantList] = useState([]);
    const [driverList, setDriverList] = useState([]);
  const classes = useStyles();

  useEffect(() => {

    fetchRestaurantList();
    fetchDriverList();
  }, []);
    const fetchRestaurantList = async () => {
      try {
        const response = await restaurantApi.getAll();
        setRestaurantList(response);
        console.log(restaurantList);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchDriverList = async () => {
          try {
            const response = await driverApi.getAll();
            setDriverList(response);
            console.log(driverList);
          } catch (e) {
            console.log(e);
          }
        };
  return (
    <div className={classes.container}>
      <LeafletMap />
    </div>
  );
}
