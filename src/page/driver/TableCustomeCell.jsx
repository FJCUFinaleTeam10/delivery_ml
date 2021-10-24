import React, {useEffect, useState} from "react";
import {Collapse, makeStyles, TableCell,} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {MapContainer, Marker, TileLayer,Polyline} from "react-leaflet";
import L from "leaflet";
import LocalShippingIcon from "../../asset/images/truck.svg";
import storeIcon from "../../asset/images/store.png";
import inventoryIcon from "../../asset/images/delivery.png";
import CircularLoading from "../../component/CircularLoading";
import ScheduleTab from "./ScheduleTab";
const useStyles = makeStyles((theme) => ({
    map: {
        height: `70vh`,
        width: `180vh`,
    },
    container: {
        width: `20%`,
        height: `5%`,
        position: `absolute`,
        bottom: `0`,
        zIndex: `1000`,
        border: `0px solid #fff`,
        backGround: `inherit`,
    },
}));
const limeOptions = { color: 'lime' };
export default function TableCustomeCell(props) {

    const {driver}=props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [zoom,setZoom] =useState(10);
    const [distance,setDistance] = useState([]);
    const [selectedIndex,setSelectedIndex] = useState(null);

    const handleClickTrackingTabItem=(e,index)=>{
        setSelectedIndex(index);
    }
    const iconTruck = new L.Icon({
        iconUrl: LocalShippingIcon,
        iconSize: new L.Point(60, 75),
    });
    const iconRestaurant = new L.Icon({
        iconUrl: storeIcon,
        iconSize: new L.Point(60, 75),
    });
    const iconOrder = new L.Icon({
        iconUrl: inventoryIcon,
        iconSize: new L.Point(60, 75),
    });
    useEffect(()=>{
        let tmp = driver.Route.map((node) => {return [node.Latitude, node.Longitude]});
        tmp.unshift([driver.Latitude,driver.Longitude]);
        setDistance(tmp);
        console.log(tmp);
        console.log(driver.Route);
    },[]);
    useEffect(()=>{
        console.log(distance);
    },[distance])

    return (
                <React.Fragment>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell align="right">{driver.Driver_ID}</TableCell>
                        <TableCell align="right">{driver.Country_Code}</TableCell>
                        <TableCell align="right">{driver.City}</TableCell>
                        <TableCell align="right">{driver.Longitude}</TableCell>
                        <TableCell align="right">{driver.Latitude}</TableCell>
                        <TableCell align="right">{driver.Velocity}</TableCell>
                        <TableCell align="right">{driver.Capacity}</TableCell>
                        <TableCell align="right">{driver.Reward}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                {distance.length>0?(
                                    <React.Fragment>
                                        <MapContainer
                                            className={classes.map}
                                            center={[driver.Latitude, driver.Longitude]}
                                            zoom={zoom}
                                        >
                                            <TileLayer
                                                url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                zoomControl="false"
                                                maxZoom="28"
                                            />
                                            <Marker
                                                icon={iconTruck}
                                                position={[driver.Latitude, driver.Longitude]}
                                            />
                                            {driver.Route.map(
                                                (node) =>
                                                    node.Latitude &&
                                                    node.Longitude && (
                                                        <Marker
                                                            icon={node.nodeType==1?iconOrder:iconRestaurant}
                                                            position={[node.Latitude, node.Longitude]}
                                                        />
                                                    ))
                                            }
                                            <Polyline pathOptions={limeOptions} positions={distance} />
                                        </MapContainer>
                                        <ScheduleTab
                                            scheduleList={driver.Route}
                                            selectedIndex={selectedIndex}
                                            handleClickTrackingTabItem={handleClickTrackingTabItem}
                                        />
                                    </React.Fragment>

                                ):(
                                    <CircularLoading />
                                )}
                            </Collapse>
                        </TableCell>
                    </TableRow>

                </React.Fragment>
    );
}
