import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Tooltip } from "react-leaflet";
import osm from './osm-provider';
import { makeStyles } from "@material-ui/core/styles";
import L from "leaflet";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Chip from "@material-ui/core/Chip";
import SpeedIcon from "@material-ui/icons/Speed";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
const useStyles = makeStyles((theme) => ({
  map: {
    height: `90vh`,
  },
  container: {
    width: `20%`,
    maxWidth: `500px`,
    minWidth: `300px`,
    height: `auto`,
    position: `absolute`,
    bottom: `0`,
    zIndex: `1000`,
    border: `1px solid #fff`,
    backGround: `inherit`,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  borderBottom: {
    borderBottom: `1px solid #fff`,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  bellIcon: {
    position: "absolute",
    right: "20px",
    top: "10px",
    zIndex: "999",
  },
}));

export default function LeafletMap() {

    const classes = useStyles();
    const [center, setCenter] = useState({ lat: 13.084622, lon: 80.24835 });
    const [statuses, setStatuses] = useState([]); // last status of each vehicles
    const [selectedIndex, setSelectedIndex] = useState(null);
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();
    const titleMap = {
          total:    "Total Vehicles",
          running:  "Running",
          tempHalt: "Temporary Halt",
          stopped:  "Parking",
          lost3G:   "Lost 3G"
        };
    const [values, setValues] = useState({
      total: 0,
      running: 0,
      tempHalt: 0,
      stopped: 0,
      lostGPS: 0,
      lost3G: 0,
    });
    const handleClick = (event, index) => {
        if (index === selectedIndex) {
          setSelectedIndex(null);
        } else {
          setSelectedIndex(index);
        }
      };
    const  renderVehicle=(Icon, text)=>{
            return (
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          };
    const renderSummary=(key)=>{
          return (
            <ListItem>
              <ListItemText primary={titleMap[key]} />
              <ListItemSecondaryAction>
                <Chip label={values[key]} />
              </ListItemSecondaryAction>
            </ListItem>
          );
        }



  return (
    <div className={classes.container}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.borderBottom}
        >
          <Typography className={classes.heading}>Live Tracking</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: `0` }}>
          <div style={{ width: `100%` }}>
            <Paper className={classes.borderBottom}>
              <List style={{ paddingBottom: `0` }} component="nav">
                <div style={{ height: `300px`, overflowY: `auto` }}>
                  {statuses.map((v, i) => (
                    <div key={i}>
                      <ListItem button onClick={(e) => handleClick(e, i)}>
                        <ListItemIcon>
                          <DriveEtaIcon />
                        </ListItemIcon>
                        <ListItemText primary={v.registrationNumber} />
                        {selectedIndex === i ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse
                        in={selectedIndex === i}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {renderVehicle(SpeedIcon, v.speed + " km/h")}
                          {renderVehicle(AccessTimeIcon, v._trackerTime)}
                          {renderVehicle(EmojiTransportationIcon, v._address)}
                        </List>
                      </Collapse>
                    </div>
                  ))}
                </div>
              </List>
            </Paper>
            <Paper>
              <List dense className={classes.root}>
                {Object.keys(titleMap).map((v) => (
                  <React.Fragment key={v}>{renderSummary(v)}</React.Fragment>
                ))}
              </List>
            </Paper>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
