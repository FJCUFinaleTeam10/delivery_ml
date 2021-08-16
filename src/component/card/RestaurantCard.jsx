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


const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2),
  },
  progressContainer: {
    position: "absolute",
    top: "60%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  root: {
    minWidth: 900,
    minHeight: 100,
  },

  paper: {
    maxWidth: 800,
    margin: `${theme.spacing(2)}px auto`,
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

export default function RestaurantCard(props) {
  const classes = useStyles();
  const [value] = React.useState(4);


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        <Grid container xs={8}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar variant="square">
                  <Avatar alt="Example Alt" src={restaurant1} />
                </Avatar>
              </Grid>
              <Grid item xs={6}>
                <Typography>藝奇 日本料理岩板燒</Typography>
                <Typography>drrrrrrrrrrrrrdddddddd</Typography>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Custom empty icon</Typography>
                  <Rating name="read-only" value={value} readOnly />
                </Box>
              </Grid>
              
                <CardActions>
                <Button variant="outlined" size="small">VIEW MENU</Button>

                </CardActions>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* <RestaurantCard/> */}
    </div>
  );
}
