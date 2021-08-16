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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
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
  const {info}= props;
  console.log(info);

  return (
    <Card className={classes.root}>
      <Grid item>
        <Avatar variant="square">
          <Avatar alt="Example Alt" src={restaurant1} />
        </Avatar>
      </Grid>
      <Grid item xs={12}>
        <Rating name="read-only" value={info.Aggregate_rating} readOnly />
        <Typography>{info.Aggregate_rating}</Typography>
        <Typography variant="h4" gutterBottom>
          {info.Locality}
        </Typography>
        <Typography>Address:{info.Address}</Typography>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Custom empty icon</Typography>
        </Box>
      </Grid>

      <CardActions>
        <Typography variant="body2" gutterBottom>
          Has Online delivery
        </Typography>
        {info.Has_Online_delivery === "Yes" ? (
          <CheckCircleIcon color="primary" />
        ) : (
          <CancelIcon color="error" />
        )}
        <Typography variant="body2" gutterBottom>
          Has Table booking
        </Typography>
        {info.Has_Table_booking === "Yes" ? (
          <CheckCircleIcon color="primary" />
        ) : (
          <CancelIcon color="error" />
        )}
        <Typography variant="body2" gutterBottom>
          Is delivering now
        </Typography>
        {info.Is_delivering_now === "Yes" ? (
          <CheckCircleIcon color="primary" />
        ) : (
          <CancelIcon color="error" />
        )}
        <Button variant="outlined" size="small" color="primary">
          VIEW MENU
        </Button>
      </CardActions>
    </Card>
    // <div className={classes.root}>
    //   <Paper className={classes.paper}>
    //     <Grid container spacing={3} wrap="nowrap">
    //         <Grid item>
    //           <Avatar variant="square">
    //             <Avatar alt="Example Alt" src={restaurant1} />
    //           </Avatar>
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Rating name="read-only" value={info.Aggregate_rating} readOnly />
    //           <Typography>{info.Aggregate_rating}</Typography>
    //           <Typography variant="h4" gutterBottom>
    //             {info.Locality}
    //           </Typography>
    //           <Typography>Address:{info.Address}</Typography>
    //           <Box component="fieldset" mb={3} borderColor="transparent">
    //             <Typography component="legend">Custom empty icon</Typography>
    //           </Box>
    //         </Grid>

    //         <CardActions>
    //           <Button variant="outlined" size="small" color="primary">
    //             VIEW MENU
    //           </Button>
    //         </CardActions>
    //     </Grid>
    //   </Paper>
    // </div>
  );
}
