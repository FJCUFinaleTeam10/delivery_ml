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
import SimpleLink from "../SimpleLink";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "25ch",
  },
  modal: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 5, 5),
  },
}));

export default function OrderCard(props) {
  const classes = useStyles();
  const [value] = React.useState(4);

  return (
    <Paper className={classes.modal}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="First Name"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Last Name"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Telephone/mobile"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Email"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="outlined-multiline-static"
              multiline
              label="Description"
              variant="outlined"
              rows={10}
            />
          </form>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" color="primary" onClick={props.confirm}>
          Confirm
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={props.cancel}>
          Cancel
        </Button>
      </Grid>
    </Paper>
  );
}
