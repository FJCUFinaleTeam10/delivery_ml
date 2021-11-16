import React, {useEffect, useState} from "react";
import {
    Collapse,
    makeStyles,
    TableCell,
} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {MapContainer, Marker, TileLayer,Polyline} from "react-leaflet";
import L from "leaflet";
import LocalShippingIcon from "../../asset/images/truck.svg";
import storeIcon from "../../asset/images/store.png";
import inventoryIcon from "../../asset/images/delivery.png";
import driverApi from "../../services/driverApi";
import restaurantApi from "../../services/restaurantApi";
import {Timeline} from "@material-ui/icons";
import {
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@material-ui/lab";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
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

const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

export default function TableCustomeCell(props) {

    const {order}=props;
    const [openCollapse, setOpenCollapse] = React.useState(false);
    const classes = useStyles();
    const [zoom,setZoom] =useState(10);
    const [targetDriver,setTargetDriver] =useState(null);
    const [driverList,setDriverList] = useState([]);
    const [restaurantList,setRestaurantList] = useState([]);
    const [distance,setDistance] = useState([]);
    const fillBlueOptions = { fillColor: 'blue' }
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

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
        if(openCollapse){
            async function getTargetDriver(){
                try {
                    const response = await  driverApi.getDriverBaseOnID({driverId:order?.driver_id});
                    setDriverList(response);
                } catch (error) {
                    console.log(error);
                }
            };
            async function getTargetRestaurant(){
                try {
                    const response = await  restaurantApi.getRestaurantBaseOnId({restaurantId:order?.order_restaurant_carrier_restaurantId});
                    setRestaurantList(response);
                } catch (error) {
                    console.log(error);
                }
            };
            getTargetDriver();
            getTargetRestaurant();
        }
    },[openCollapse]);
    useEffect(()=>{
        if(driverList.length>0 && restaurantList.length>0){
            setDistance( [[driverList[0]?.Latitude,driverList[0]?.Longitude]]);
            setDistance( distance => [...distance, [parseFloat(restaurantList[0]?.Latitude), parseFloat(restaurantList[0]?.Longitude)]]);
            setDistance(distance => [...distance, [order?.Latitude,order?.Longitude]]);
        }
    },[driverList,order,restaurantList]);

    useEffect(()=>{console.log(order);},[order])
    useEffect(()=>{console.log(distance);},[distance])
    useEffect(()=>{setTargetDriver(driverList[0])},[driverList])
    useEffect(()=>{setTargetDriver(driverList[0])},[driverList])
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
                        <TableCell align="right">{order.Order_ID}</TableCell>
                        <TableCell align="right">{order.order_approved_at}</TableCell>
                        <TableCell align="right">{order.Latitude}</TableCell>
                        <TableCell align="right">{order.Longitude}</TableCell>
                        <TableCell align="right">{order.order_delivered_customer_date}</TableCell>
                        <TableCell align="right">{order.order_estimated_delivery_date}</TableCell>
                        <TableCell align="right">{order.order_request_time}</TableCell>
                        <TableCell align="right">{order.order_restaurant_carrier_date}</TableCell>
                        <TableCell align="right">{order.order_restaurant_carrier_restaurantId}</TableCell>
                        <TableCell align="right">{order.driver_id}</TableCell>
                        <TableCell align="right">{order.order_status}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                                    <MapContainer
                                        className={classes.map}
                                        center={[order?.Latitude, order?.Longitude]}
                                        zoom={zoom}
                                    >
                                        <TileLayer
                                            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            zoomControl="false"
                                            maxZoom="28"
                                        />
                                        <Marker
                                            icon={iconOrder}
                                            position={[order?.Latitude, order?.Longitude]}
                                        />
                                        {driverList.map((driver,index)=>{
                                            return driver.Longitude && driver.Latitude && (
                                                <Marker
                                                    icon={iconTruck}
                                                    position={[driver?.Latitude,driver?.Longitude]}
                                                />
                                            )
                                        })}
                                        {restaurantList.map((restaurant,index)=>{
                                            return restaurant.Longitude && restaurant.Latitude && (
                                                <Marker
                                                    icon={iconRestaurant}
                                                    position={[restaurant?.Latitude,restaurant?.Longitude]}
                                                />
                                            )
                                        })}
                                        <Polyline pathOptions={fillBlueOptions} positions={distance} />
                                    </MapContainer>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                    <Timeline position="auto">
                        <TimelineItem>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                align="right"
                                variant="body2"
                                color="text.secondary"
                            >
                                9:30 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot>
                                    <FastfoodIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h6" component="span">
                                    Eat
                                </Typography>
                                <Typography>Because you need strength</Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                variant="body2"
                                color="text.secondary"
                            >
                                10:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot color="primary">
                                    <LaptopMacIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h6" component="span">
                                    Code
                                </Typography>
                                <Typography>Because it&apos;s awesome!</Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot color="primary" variant="outlined">
                                    <HotelIcon />
                                </TimelineDot>
                                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '100px', px: 2 }}>
                                <Typography variant="h6" component="span">
                                    Sleep
                                </Typography>
                                <Typography>Because you need rest</Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                <TimelineDot color="secondary">
                                    <RepeatIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '50%', px: 2 }}>
                                <Typography variant="h6" component="span">
                                    Repeat
                                </Typography>
                                <Typography>Because this is the life you love!</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </React.Fragment>
    );
}
