import React, { useEffect, useState, useMemo } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import manIcon from '../../asset/images/man-silhouette.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "25ch",
  },
  map: {
    height: `25vh`,
    width: `25vh`,
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
  const {currentPosition} = props;

  const customeIcon = new L.Icon({
    iconUrl: { manIcon },
    iconSize: new L.Point(60, 75),
    iconAnchor: [32, 64],
    popupAnchor: [-3, -76],
  });

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  }
  const renderMap =() => {
    return (
      <MapContainer
        center={props?.currentPosition}
        zoom={props.zoom}
        className={classes.map}
        onClick={props.handleUpdateCurrentPostition}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zoomControl="false"
          maxZoom="28"
        />
        {props.currentPosition && (
          <Marker
            position={props?.currentPosition}
            draggable={props.draggable}
            icon={customeIcon}
            eventHandlers={props.handleUpdateCurrentPostition}
            ref={props.ref}
          >
            <SetViewOnClick coords={props?.currentPosition} />
          </Marker>
        )}
      </MapContainer>
    );
  }

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
        <Grid item xs={5}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Latitude"
              variant="outlined"
              defaultValue={currentPosition[0]}
            />
          </form>
        </Grid>
        <Grid item xs={5}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Longitude"
              variant="outlined"
              defaultValue={currentPosition[1]}
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          {renderMap()}
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
              rows={5}
            />
          </form>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={props.confirm}>
              Confirm
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={props.cancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
