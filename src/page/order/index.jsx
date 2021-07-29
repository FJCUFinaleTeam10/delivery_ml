import React, { useEffect, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import orderApi from "../../services/orderApi";
import restaurantApi from "../../services/restaurantApi";
import CircularLoading from '../../component/CircularLoading';
const useStyles = makeStyles((theme) => ({
}));

export default function Order() {
  const [restaurantList,setRestaurantList] = useState([]);
  const [currentRestaurant,setCurrentRestaurant] = useState(null);
  const classes = useStyles();
  useEffect(()=>{
    fetch_restaurant_list();
    setTimeout(() => {
      setCurrentRestaurant(0);
    }, 1000);
  },[]);

  const fetch_restaurant_list= async()=>{
    try {
      const response = await restaurantApi.getAll();
      setRestaurantList(response);
    } catch (error) {
      console.log(error);
    }
  };
    const handleChange = (event) => {
      setCurrentRestaurant(event.target.value);
    };
  const formatDate=(originDateTime)=>{
    let year = new Intl.DateTimeFormat("en", {
      year: "numeric",
      hour12: false,
    }).format(originDateTime);
    let month = new Intl.DateTimeFormat("en", {
      month: "numeric",
      hour12: false,
    }).format(originDateTime);
    let day = new Intl.DateTimeFormat("en", {
      day: "numeric",
      hour12: false,
    }).format(originDateTime);
    let hour = new Intl.DateTimeFormat("en", {
      hour: "numeric",
      hour12: false,
    }).format(originDateTime);
    let minute = new Intl.DateTimeFormat("en", {
      minute: "numeric",
      hour12: false,
    }).format(originDateTime);
    let second = new Intl.DateTimeFormat("en", {
      second: "numeric",
      hour12: false,
    }).format(originDateTime);

    return `${(day<=9?'0'+day:day)}-${(month<=9?'0'+month:month)}-${year} ${(hour<=9?hour:hour)}:${(minute<=9?'0'+minute:minute)}:${(second<=9?'0'+second:second)}`;
  }
  const handleClick = async () => {
      try {
        console.log(process.env);
            const params = {
              longitude: restaurantList[currentRestaurant].longitude,
              latitude: restaurantList[currentRestaurant].latitude,
              requestTime:formatDate(Date.now()),
              restaurantId: restaurantList[currentRestaurant].id,
            };
        console.log(currentRestaurant);
        const respone = await orderApi.createOrder(params);
        return respone;
      } catch (e) {
        console.log(e);
      }
      
    };
    const renderFrom = ()=>{
      return(
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-select-currency"
              select
              label="Select"
              value={currentRestaurant}
              onChange={handleChange}
              helperText="Please select your currency"
            >
            {restaurantList.map((option,index) => (
              <MenuItem key={option.id} value={index}>
                {option.id}
              </MenuItem>
            ))}
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleClick()}
            >
              create Order
            </Button>
          </div>
        </form>
      );
    };

  return (
    <div>
      {restaurantList.length>0?(
          renderFrom()
      ):(
        <CircularLoading/>
      )}
    </div>
  );
}
