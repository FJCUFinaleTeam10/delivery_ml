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
import Pagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 900,
    minHeight: 100,
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
  const [restaurantList,setRestaurantList]=useState();
  const [currentPage,setCurrentPage]=useState(1);
  const [currentLimit,setCurrentLimit]=useState(10);
   const array = [1, 2, 3, 4, 5];

  useEffect(() => {
    setInterval(() => {
      fetch_restaurant_list(array);
      
    }, 5000); // 5s
  }, []);

const renderRestaurantsList  = () => {
  console.log(array);
   return array.map((restaurant) => (
    <RestaurantCard />
   ));
}
  const fetch_restaurant_list = async () => {
    try {
      const params ={
        page:currentPage,
        limit: currentLimit,
      }
      console.log(params);
      const response = await restaurantApi.getRestaurantList(params);
      console.log(response);
      setRestaurantList(response);

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Button
            width="200"
            variant="contained"
            color="#424242"
            disableElevation
          >
            VIEW ON MAP
          </Button>
        </Grid>
        <Grid container xs={8}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar variant="square">
                  <Avatar alt="Example Alt" src={restaurant1} />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography>藝奇 日本料理岩板燒</Typography>
                <Typography>drrrrrrrrrrrrrdddddddd</Typography>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Custom empty icon</Typography>
                  <Rating name="read-only" value={value} readOnly />
                </Box>
              </Grid>
              <CardActions>
                <Button size="small">VIEW MENU</Button>
              </CardActions>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* <RestaurantCard/> */}
      {renderRestaurantsList()}
      <Pagination count={10} color="secondary" />
    </div>
  );
}
