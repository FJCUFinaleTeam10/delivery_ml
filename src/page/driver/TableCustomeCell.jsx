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
import driverApi from "../../services/driverApi";
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
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [zoom,setZoom] =useState(10);
    const [distance,setDistance] = useState([]);
    const [selectedIndex,setSelectedIndex] = useState(null);
    const [routeList,setRouteList] = useState([]);
    const [openItemList,setOpenItemList] = useState([]);

    const handleClickTrackingTabItem=(e,index)=>{
        let newOpenList = [...openItemList];
        newOpenList[index] = !newOpenList[index];
        setOpenItemList(newOpenList);
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
        if(open){
            async function fetch_route_list(){
                try {
                    const response = await  driverApi.getCurrentRoute({
                        driverID : driver.Driver_ID
                    });
                    console.log(response);
                    setRouteList(response);
                } catch (error) {
                    console.log(error);
                }
            };
            fetch_route_list();
            setOpenItemList(new Array(routeList).fill(false));
        }
    },[open]);
    useEffect(()=>{
        let tmp = [[driver.Latitude,driver.Longitude]];
        if(routeList.length>0){
            [...routeList].map((routeNode)=>{tmp.push([routeNode.Latitude,routeNode.Longitude])});
        }
        setDistance(tmp);
    },[routeList,driver])

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
                                {routeList.length>0?(
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
                                            {routeList.map(
                                                (node) =>
                                                    node.Latitude &&
                                                    node.Longitude && (
                                                        <Marker
                                                            icon={node.nodetype==1?iconOrder:iconRestaurant}
                                                            position={[node.Latitude, node.Longitude]}
                                                        />
                                                    ))
                                            }
                                            <Polyline pathOptions={limeOptions} positions={distance} />
                                        </MapContainer>

                                        <ScheduleTab
                                            scheduleList={routeList}
                                            selectedIndex={selectedIndex}
                                            handleClickTrackingTabItem={handleClickTrackingTabItem}
                                            itemOpenList={openItemList}
                                        />
                                    </React.Fragment>
                                ):(
                                    <CircularLoading/>
                                    )}
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
    );
}
