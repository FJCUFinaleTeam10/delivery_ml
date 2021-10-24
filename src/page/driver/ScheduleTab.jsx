import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
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
import Collapse from "@material-ui/core/Collapse";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import StoreIcon from '@mui/icons-material/Store';
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

export default function ScheduleTab(props) {
    const classes = useStyles();
    const {scheduleList} = props;
    const {selectedIndex} = props;
    const {handleClickTrackingTabItem} = props;
    useEffect(()=>{
        console.log(scheduleList);
    },[]);
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
    return (
        <div className={classes.container}>
            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    className={classes.borderBottom}
                >
                    <Typography className={classes.heading}>{"Schedule List"}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ padding: `0` }}>
                    <div style={{ width: `100%` }}>
                        <Paper className={classes.borderBottom}>
                            <List style={{ paddingBottom: `0` }} component="nav">
                                <div style={{ height: `300px`, overflowY: `auto` }}>
                                    {scheduleList.map((r, index) => (
                                        <div key={index}>
                                            <ListItem
                                                button
                                                onClick={(e) => handleClickTrackingTabItem(e, index)}
                                            >
                                                <ListItemIcon>
                                                    {r.nodeType==0?<StoreIcon />:<CardTravelIcon />}
                                                </ListItemIcon>
                                                <ListItemText primary={`position ${index}`} />
                                                {selectedIndex === index ? <ExpandLess /> : <ExpandMore />}
                                            </ListItem>
                                            <Collapse in={selectedIndex === index} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {renderVehicle(
                                                        EmojiTransportationIcon,
                                                        "restaurantId:" + r.order_restaurant_carrier_restaurantId
                                                    )}
                                                    {renderVehicle(
                                                        EmojiTransportationIcon,
                                                        "order Id:" + r.order_restaurant_carrier_restaurantId
                                                    )}
                                                    {renderVehicle(
                                                        EmojiTransportationIcon,
                                                        "Longitude:" + r.order_restaurant_carrier_restaurantId
                                                    )}
                                                    {renderVehicle(
                                                        EmojiTransportationIcon,
                                                        "Latitude:" + r.order_restaurant_carrier_restaurantId
                                                    )}

                                                </List>
                                            </Collapse>
                                        </div>
                                    ))}
                                </div>
                            </List>
                        </Paper>
                        <Paper>
                            <List dense className={classes.root}>
                            </List>
                        </Paper>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
