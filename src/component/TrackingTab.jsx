import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import Collapse from "@material-ui/core/Collapse";
import SpeedIcon from "@material-ui/icons/Speed";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import StorageIcon from "@material-ui/icons/Storage";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme) => ({
  container: {
    width: `30%`,
    maxWidth: `500px`,
    minWidth: `300px`,
    height: `auto`,
    position: `absolute`,
    bottom: `0`,
    zIndex: `1000`,
    border: `1px solid #fff`,
    backGround: `inherit`,
  },
  borderBottom: {
    borderBottom: `1px solid #fff`,
  },
  tab: {
    flexGrow: 1,
  },
}));

export default function TrackingTab(props) {
  const classes = useStyles();
  const {restaurantList} = props;
  const {driverList} = props;
  const {orderList} = props;
  const {selectedIndex} = props;
  const {handleClickTrackingTabItem} = props;
  const  {currentTrackingTab} = props;
  const {handleChangeTrackingTab} = props;
  console.log(restaurantList);
  console.log(driverList);
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
  
  const renderVehicleList = ()=>{
    return (
      <List style={{ paddingBottom: `0` }} component="nav">
        <div style={{ height: `300px`, overflowY: `auto` }}>
          {driverList.map((v, i) => (
            <div key={i}>
              <ListItem
                button
                onClick={(e) => handleClickTrackingTabItem(e, i)}
              >
                <ListItemIcon>
                  <DriveEtaIcon />
                </ListItemIcon>
                <ListItemText
                  primary={v.id.substring(v.id.length - 4, v.id.length)}
                />
                {selectedIndex === i ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
                <Divider />
              <Collapse in={selectedIndex === i} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {renderVehicle(SpeedIcon, "Velocity:" + v.Velocity + " km/h")}
                  {renderVehicle(StorageIcon, "Capacity:" + v.Capacity)}
                  {renderVehicle(
                    EmojiTransportationIcon,
                    "Location:" + v.Longitude + " " + v.Latitude
                  )}
                </List>
              </Collapse>
            </div>
          ))}
        </div>
      </List>
    );
  };
  
  const renderRestaurantsList=() => {
     return (
       <List style={{ paddingBottom: `0` }} component="nav">
         <div style={{ height: `300px`, overflowY: `auto` }}>
           {restaurantList.map((r, i) => (
             <div key={i}>
               <ListItem
                 button
                 onClick={(e) => handleClickTrackingTabItem(e, i)}
               >
                 <ListItemIcon>
                   <RestaurantMenuIcon />
                 </ListItemIcon>
                 <ListItemText primary={r.Restaurant_Name} />
                 {selectedIndex === i ? <ExpandLess /> : <ExpandMore />}
               </ListItem>
                 <Divider />
               <Collapse in={selectedIndex === i} timeout="auto" unmountOnExit>
                 <List component="div" disablePadding>
                   {renderVehicle(ThumbUpIcon, "Votes:" + r.Votes)}
                   {renderVehicle(MenuBookIcon, "Cuisines::" + r.Cuisines)}
                   {renderVehicle(
                     EmojiTransportationIcon,
                     "Location:" + r.Address
                   )}
                 </List>
               </Collapse>
             </div>
           ))}
         </div>
       </List>
     );
  }
   const renderOrderList = () => {
     return (
       <List style={{ paddingBottom: `0` }} component="nav">
         <div style={{ height: `300px`, overflowY: `auto` }}>
           {orderList.map((r, i) => (
             <div key={i}>
               <ListItem
                 button
                 onClick={(e) => handleClickTrackingTabItem(e, i)}
               >
                 <ListItemIcon>
                   <CardTravelIcon />
                 </ListItemIcon>
                 <ListItemText primary={r.id} />
                 {selectedIndex === i ? <ExpandLess /> : <ExpandMore />}
               </ListItem>
                 <Divider />
               <Collapse in={selectedIndex === i} timeout="auto" unmountOnExit>
                 <List component="div" disablePadding>
                   {renderVehicle(
                     ThumbUpIcon,
                     "cart approved at:" + r.order_approved_at
                   )}
                   {renderVehicle(MenuBookIcon, "Latitude:" + r.Latitude)}
                   {renderVehicle(MenuBookIcon, "Longtitude:" + r.Longitude)}
                   {renderVehicle(
                     EmojiTransportationIcon,
                     "delivery date:" + r.order_request_time
                   )}
                   {renderVehicle(
                     EmojiTransportationIcon,
                     "requested date:" + r.order_request_time
                   )}
                   {renderVehicle(
                     EmojiTransportationIcon,
                     "got package from restaurant date:" +
                       r.order_restaurant_carrier_date
                   )}
                   {renderVehicle(
                     EmojiTransportationIcon,
                     "restaurantId:" + r.order_restaurant_carrier_restaurantId
                   )}
                   {renderVehicle(
                     EmojiTransportationIcon,
                     "cart status:" + r.order_status
                   )}
                 </List>
               </Collapse>
             </div>
           ))}
         </div>
       </List>
     );
   };


  return (
    <div className={classes.container}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.borderBottom}
        >
          <Typography className={classes.heading}>{"Live Tracking"}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: `0` }}>
          <div style={{ width: `100%` }}>
            <Paper className={classes.borderBottom}>
              <Tabs
                className={classes.tabs}
                value={currentTrackingTab}
                onChange={handleChangeTrackingTab}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label={`Driver (${driverList.length})`} />
                <Tab label={`Restaurant (${restaurantList.length})`} />
                <Tab label={`Order (${orderList.length})`}/>
              </Tabs>
              {currentTrackingTab===0?(
                renderVehicleList()
              ):(currentTrackingTab===1?(
                renderRestaurantsList()):(
                renderOrderList()
                ))}
              
            </Paper>
            <Paper>
              <List dense className={classes.root}>
                {/* {Object.keys(titleMap).map((v) => (
                  <React.Fragment key={v}>{renderSummary(v)}</React.Fragment>
                ))} */}
              </List>
            </Paper>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
