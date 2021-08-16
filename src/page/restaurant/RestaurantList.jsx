import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import restaurant1 from "../../asset/images/restaurant1.jpg";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import restaurantApi from "../../services/restaurantApi";
import RestaurantCard from "../../component/card/RestaurantCard";
import restaurantListBackground from "../../asset/images/restaurantListBackground.jpg";
import restaurantAPi from "../../services/restaurantApi";
import CircularLoading from "../../component/CircularLoading";
import Pagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },

  paper: {
    maxWidth: 800,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function RestaurantList() {
  const classes = useStyles();
  const [value] = React.useState(4);
  const [restaurantList, setRestaurantList] = useState([]);
  const array = [1, 2, 3, 4, 5];
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    setInterval(() => {
      fetch_restaurant_list();
    }, 5000); // 5s
  }, []);
  const renderRestaurantsList = () => {
    return (
      <Grid container spacing={3}>
        {restaurantList.map((restaurant) => (
          <Grid item xs={12}>
            <RestaurantCard info={restaurant} />
          </Grid>
        ))}
      </Grid>
    );
  };
  const fetch_restaurant_list = async () => {
    try {
      const params = {
        skip: currentPage,
        limit: limit,
      };
      // console.log(params);
      const response = await restaurantApi.getRestaurantList(params);
      setRestaurantList(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.root}>
      <Button
              width="200"
              variant="contained"
              color="#424242"
              disableElevation
            >
              VIEW ON MAP
            </Button>
      {restaurantList.length > 0 ? (
        renderRestaurantsList()
      ) : (
        <CircularLoading />
      )}
    </div>
  );
}
