
import React, { useState, useRef } from "react";
import L from "leaflet";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
const Tracking = ({ vehicles }) => {
  const classes = useStyles();
  const t = useTrans();
  const [openNotification, setOpenNotification] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [statuses, setStatuses] = useState([]); // last status of each vehicles

  const [values, setValues] = useState({
    total: 0,
    running: 0,
    tempHalt: 0,
    stopped: 0,
    lostGPS: 0,
    lost3G: 0,
  });

  const [overlays, setOverlays] = useState([]);
  const axios = createAxios();
  const noti = useNoti();

  const titleMap = {
    total: t("Total Vehicles", "車輛總數"),
    running: t("Running", "行駛中車輛"),
    tempHalt: t("Temporary Halt", "暫停車輛"),
    stopped: t("Parking", "停泊中車輛"),
    lostGPS: t("Lost GPS", "GPS掉線車輛"),
    lost3G: t("Lost 3G", "3G掉線車輛"),
  };

  const handleClick = (event, index) => {
    if (index === selectedIndex) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };
  
  const createUpdateFunction = () => () => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/live-tracking`);
        // record doesn't has lat or long is lostGPS
        const temp = response.data.filter((i) => i.lat && i.long);
        const data = _.groupBy(temp, "registrationNumber");
        const by = (att) => (a, b) => a[att] - b[att];
        for (const key in data) {
          data[key].sort(by("trackerTime"));
        }
        let statuses = [];
        for (const key in data) {
          const arr = data[key];
          statuses.push(arr[arr.length - 1]);
        }
        statuses = statuses.map((status) =>
          Object.assign(status, {
            _trackerTime: DateTime.fromISO(status.trackerTime).toFormat(
              "hh:mm:ss dd-MMM-yyyy"
            ),
          })
        );
        setValues(process(data, vehicles));
        setStatuses(statuses);
      } catch (e) {
        noti("error", e.toString());
      }
    };
    if (vehicles) {
      fetch();
    }
  };
  const handleClickOpen = () => {
    setOpenNotification(true);
  };
  const handleClose = () => {
    setOpenNotification(false);
  };
  useEffect(() => {
    const fetchOverlays = async () => {
      try {
        const response = await axios.get(`/overlays`);
        setOverlays(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchOverlays();
    createUpdateFunction()();
  }, [vehicles]); // eslint-disable-line react-hooks/exhaustive-deps
  function renderVehicle(Icon, text) {
    return (
      <ListItem className={classes.nested}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    );
  }
  function renderSummary(key) {
    return (
      <ListItem>
        <ListItemText primary={titleMap[key]} />
        <ListItemSecondaryAction>
          <Chip label={values[key]} />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
  function renderTrackingSummary() {
    return (
      <div className={classes.container}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.borderBottom}
          >
            <Typography className={classes.heading}>
              {t("Live Tracking", "即時監控")}
            </Typography>
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
                          {selectedIndex === i ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
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
  const hanoi = [21.028511, 105.804817];
  const center = statuses.length ? [statuses[0].lat, statuses[0].long] : hanoi;
  const zoom = 15;
  useInterval(() => {
    createUpdateFunction()();
  }, 5000); // 5s
  return (
    <div style={{ position: "relative" }}>
      <Paper className={classes.bellIcon}>
        <Button className={classes.link} onClick={handleClickOpen}>
          <NotificationsIcon />
        </Button>
      </Paper>
      <Dialog
        open={openNotification}
        onClose={handleClose}
        // maxWidth='1000px'
      >
        <Notification data={vehicles} />
      </Dialog>
      <Map className={classes.map} center={center} zoom={zoom}>
        <TileLayer
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zoomControl="false"
          maxZoom="28"
        />
        {statuses.map(
          (v) =>
            v.lat &&
            v.long && (
              <Marker
                key={v.registrationNumber}
                icon={L.icon({ iconUrl: carSideIcon })}
                position={[v.lat, v.long]}
              >
                <Tooltip permanent direction="left">
                  {v.registrationNumber}
                </Tooltip>
              </Marker>
            )
        )}
        {overlays.map((v) => (
          <Marker
            icon={L.icon({ iconUrl: beachflagIcon })}
            position={[v.lat, v.lng]}
          ></Marker>
        ))}
      </Map>
      {renderTrackingSummary()}
    </div>
  );
};
