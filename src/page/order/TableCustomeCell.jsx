import React, {useEffect, useState} from "react";
import {Collapse, makeStyles, TableCell} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";
import LocalShippingIcon from "../../asset/images/truck.svg";
import {Polyline} from "leaflet/dist/leaflet-src.esm";
import storeIcon from "../../asset/images/store.png";
import inventoryIcon from "../../asset/images/delivery.png";
import CircularLoading from "../../component/CircularLoading";
import TrackingTab from "../../component/TrackingTab";
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

export default function TableCustomeCell(props) {

    const {order}=props;
    const [openCollapse, setOpenCollapse] = React.useState(false);
    const classes = useStyles();
    const [zoom,setZoom] =useState(10);
    const [distance,setDistance] = useState([]);
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
    // useEffect(()=>{
    //     let tmp = [...distance];
    //     for(let i =0;i<driver.Route.length-1;i++){
    //         tmp.push({
    //             from_lat: driver.Route[i].Latitude,
    //             from_long:driver.Route[i].Longitude,
    //             to_lat:driver.Route[i+1].Latitude,
    //             to_long:driver.Route[i+1].Longitude
    //         });
    //     }
    //     setDistance(tmp);
    //     console.log(tmp);
    // },[]);
    // useEffect(()=>{
    //     console.log(distance);
    // },[distance])
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
                                onClick={() => setOpenCollapse(!openCollapse)}
                            >
                                {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell align="right">{order.id}</TableCell>
                        <TableCell align="right">{order.order_approved_at}</TableCell>
                        <TableCell align="right">{order.Latitude}</TableCell>
                        <TableCell align="right">{order.Longitude}</TableCell>
                        <TableCell align="right">{order.order_delivered_customer_date}</TableCell>
                        <TableCell align="right">{order.order_estimated_delivery_date}</TableCell>
                        <TableCell align="right">{order.order_request_time}</TableCell>
                        <TableCell align="right">{order.order_restaurant_carrier_date}</TableCell>
                        <TableCell align="right">{order.order_restaurant_carrier_restaurantId}</TableCell>
                        <TableCell align="right">{order.customer_phone_number}</TableCell>
                        <TableCell align="right">{order.driver_id}</TableCell>

                        <TableCell align="right">{order.order_status}</TableCell>
                        <TableCell align="right">{order.Qtable_position}</TableCell>
                        <TableCell align="right">{order.Qtable_updated}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                                    <MapContainer
                                        className={classes.map}
                                        center={[order.Latitude, order.Longitude]}
                                        zoom={zoom}
                                    >
                                        <TileLayer
                                            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            zoomControl="false"
                                            maxZoom="28"
                                        />
                                        <Marker
                                            icon={iconOrder}
                                            position={[order.Latitude, order.Longitude]}
                                        />
                                        {/*{order.Route.map(*/}
                                        {/*    (node) =>*/}
                                        {/*        node.Latitude &&*/}
                                        {/*        node.Longitude && (*/}
                                        {/*            <Marker*/}
                                        {/*                icon={node.nodeType==0?iconOrder:iconRestaurant}*/}
                                        {/*                position={[node.Latitude, node.Longitude]}*/}
                                        {/*            />*/}
                                        {/*        ))*/}
                                        {/*}*/}
                                        {/*{distance.map((dis,index) => {*/}
                                        {/*    return <Polyline key={index} positions={[*/}
                                        {/*        [dis.from_lat, dis.from_long], [dis.to_lat, dis.to_long],*/}
                                        {/*    ]} color={'red'} />*/}
                                        {/*})}*/}
                                    </MapContainer>

                            </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
    );
}
