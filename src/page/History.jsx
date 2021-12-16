import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {
    makeStyles,
    useTheme,
    createStyles,
    withStyles
} from '@material-ui/core/styles';
import {
    MapContainer,
    TileLayer,
    Popup,
    Marker,
    Polyline
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import _, { map } from 'underscore';
import startIcon from '../asset/images/begin.png';
import endIcon from '../asset/images/end.png';
import carSideIcon from '../asset/images/vehicle.png';

import LocalShippingIcon from "../asset/images/truck.svg";
import storeIcon from "../asset/images/store.png";
import inventoryIcon from "../asset/images/delivery.png";


import Grid from '@material-ui/core/Grid';
import ModifiedMatTable from '../component/ModifiedMatTable';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { DateTime } from 'luxon';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import "leaflet/dist/leaflet.css";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"
import initDemo from "./demo";
import {
    useNativeSelect,
    useVehicleData,
    useTrans,
    useDateTimePicker,
    useInterval
} from '../hooks';
import { createAxios, useNoti } from '../services';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import L from 'leaflet';
import geolocationApi from "../services/geolocationApi";
import MenuItem from "@mui/material/MenuItem";
// import {Marker, Polyline} from "leaflet/dist/leaflet-src.esm";
import {Tooltip} from "@material-ui/core";
import driverApi from "../services/driverApi";
import ResultDialog from "../component/ResultDialog";
import routeHistoryApi from "../services/routeHistoryApi";
import historyApi from "../services/historyApi";
const MySlider = withStyles({
    root: {
        color: '#87ff69'
    }
})(Slider);
const PlayButton = withStyles({
    root: {
        color: '#87ff69'
    }
})(IconButton);
const PauseButton = withStyles({
    root: {
        color: '#ff4a4a'
    }
})(IconButton);

const carIcon = new L.icon({
    iconUrl: carSideIcon,
    iconSize: [30, 30]
});
// const MAX_SPEED = 70;
const drawerWidth = 500;
const useStyles = makeStyles(theme => createStyles({
    // root: {
    //     display: 'flex',
    // },
    map: {
        height: `90vh`
    },
    formControl: {
        minWidth: 150,

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    slider: {
        width: 200
    }
}));

const methodList = [{
    'name':'SIMA',
    },{
    'name':'SPMA',
    }];

const initCenter = [23.553118, 121.0211024];

function gen_position() {
    return {
        lat:(Math.random()*360-180).toFixed(8),
        lng:(Math.random()*180-90).toFixed(8)}
}

export default () => {
    const classes = useStyles();
    const [speedLimit, setSpeedLimit] = useState(70);
    const [data, setData] = useState([]);
    const polyline = data.filter(i => i.lat && i.long).map(d => [d.lat, d.long]);
    const [currentSelectedCity,setCurrentSelectedCity]= useState(0);
    const [currentCityLabel, setCurrentCityLabel] = useState('');
    const [center,setCenter] = useState({
        City: "Chandigarh",
        City_id: 9,
        Country_Code: 1,
        lat: 30.7353,
        lng: 76.7911,
        id: "616bc7199a588a2f1d67aed6",
        radius: 0.048094947,
    });
    const [open, setOpen] = useState(true);
    const [delay, setDelay] = useState(5000);
    const theme = useTheme();
    const axios = createAxios();
    const t = useTrans();
    const noti = useNoti();
    const fleets = useVehicleData(true);
    const initialDate = new Date('2021-12-12T10:50');
    const select = useNativeSelect('');
    const from = useDateTimePicker(initialDate);
    const to = useDateTimePicker(new Date('2021-12-12T11:00'));
    const [isRunning, setIsRunning] = useState(false);
    const mapRef = useRef();
    const [driverIDList,setDriverIDList] = useState([]);
    const [vehiclePos,setVehiclePos] = useState({latlng:gen_position()});
    const [prevPos,setPrevPos] = useState({latlng:gen_position()});
    const [openDialog, setOpenDialog] = React.useState(false);
    const [fullWidthDialog, setFullWidthDialog] = React.useState(true);
    const [maxWidthDialog, setMaxWidthDialog] = React.useState('sm');
    const [history,setHistory] = useState([]);
    const [currentMethod,setCurrentMethod]=useState(0);
    const [timePosition,setTimePosition] = useState(0);
    const [routeHistoryList,setRouteHistoryList] = useState([]);
    const [restaurantList,setRestaurantList] = useState([]);
    const handleClickOpen = () => {setOpenDialog(true);};
    const handleClose = () => {setOpenDialog(false);};
    const handleMaxWidthChange = (event) => {setMaxWidthDialog(event.target.value,);};
    const handleFullWidthChange = (event) => {setFullWidthDialog(event.target.checked);};

    const [cityList,setCityList] = useState([{
        City: "Chandigarh",
        City_id: 9,
        Country_Code: 1,
        Latitude: 30.7353,
        Longitude: 76.7911,
        id: "616bc7199a588a2f1d67aed6",
        radius: 0.048094947,
    }]);


    useEffect(()=>{
        console.log(currentCityLabel);
    },[currentCityLabel]);

    useEffect(()=>{
        setTimeout(() => {// updates position every 5 sec
            setVehiclePos({latlng:gen_position()})
        }, 5000);
            async function fetchCity(){
                const response = await geolocationApi.getAllCity();
                setCityList(response);
            };
            fetchCity();
    },[]);


    useEffect(()=>{
        console.log(cityList);
        if(cityList.length>0){
            setCurrentSelectedCity(0);
        }
    },[cityList]);

    useEffect(()=>{
        console.log(routeHistoryList);
    },[routeHistoryList]);

    useEffect(()=>{
        console.log(isRunning);
    },[isRunning]);
    useEffect(()=>{
        console.log(timePosition);
    },[timePosition]);

    useEffect(()=>{
        setCenter([cityList[currentSelectedCity]?.Latitude, cityList[currentSelectedCity]?.Longitude]);
        const {current={}}=mapRef;
        if('getSize' in current){
            current?.setView([cityList[currentSelectedCity]?.Latitude,
                                                    cityList[currentSelectedCity]?.Longitude],15);
        }
        setVehiclePos({
            lat: cityList[currentSelectedCity]?.Latitude,
            lng: cityList[currentSelectedCity]?.Longitude
        });
        setPrevPos({
            lat: cityList[currentSelectedCity]?.Latitude,
            lng: cityList[currentSelectedCity]?.Longitude
        });

    },[currentSelectedCity]);

    useInterval(() => {
        const next = timePosition+1;

        if (next>=driverIDList[0].dataTime.length) {
            setIsRunning(false);
            return;
        }
        setTimePosition(next);
        console.log({next});
        // setViewport(prev => ({ ...prev, center: next}));
    }, isRunning ? delay : null);

    function resolveStatus(i) {
        let status;
        if (i.acc && i.speed > 0) {
            status = t('Running', 'Running');
        } else if (i.acc && i.speed === 0) {
            status = t('Temporary Halt', 'Temporary Halt');
        } else {
            status = t('Parking', 'Parking');
        }
        return status;
    }
    const columns = [
        { title: t('ID','ID'), field: 'id' },
        { title: t('Status','Status'), render: rowData => resolveStatus(rowData)},
        { title: t(`Time`, 'Time'), field: '_trackerTime' },
        { title: t('Speed', 'Speed'), field: 'speed' },
        { title: t('Traveled kilometers', 'Traveled kilometers'), field: 'traveledKilometers' },
        { title: t('Address', 'address'), field: 'address' }
    ];

    function play() {
        setIsRunning(true);
        console.log(driverIDList.length);
        console.log(driverIDList[0].dataTime.length);
        if(driverIDList[0].length>0&&timePosition>=driverIDList[0].dataTime.length){
            timePosition(0);
        }

    }
    function pause() {setIsRunning(false);}
    const handleChange = (event, newValue) => {setDelay(newValue);};
    const handleSpeedLimitChange = (event) => {
        setSpeedLimit(event.target.value);
    };
    const handleDrawerOpen = () => {setOpen(true);};
    const handleDrawerClose = () => {setOpen(false);};

    const handleChangeCity=(event)=>{
        console.log(event.target.value);
        setCurrentSelectedCity(event.target.value);
        setCurrentCityLabel(cityList[event.target.value].City);
    }
    const handleChangeMethod=(event)=>{
        setCurrentMethod(event.target.value);
    }

    const submit = async (event) => {
        try {
            const params = {
                cityID:cityList[currentSelectedCity].City_id,
                method: currentMethod,
                from: from.value,
                to: to.value
            }

            const routeHistoryResponse = await  routeHistoryApi.getHistoryBaseOnDriverID(params);
            const historyRespone = await  historyApi.getHistoryBaseOnCityID(params);


            if (routeHistoryResponse.data.length> 0) {
                routeHistoryResponse.data = routeHistoryResponse.data.map(x => Object.assign(x, {
                    _trackerTime: DateTime.fromISO(x.trackerTime).toFormat('hh:mm:ss dd-MMM-yyyy')
                }));
            }
            setDriverIDList([...historyRespone.driverList].map(driverID =>(
                {
                    driverID:driverID,
                    dataTime: historyRespone.data
                        .filter(function(indexTime){return parseInt(indexTime.D_id) ==driverID;})
                        .map(index=> Object.assign(index, {
                            lat: index.Latitude,
                            lng: index.Longitude,
                            }))

                    })));

            setRestaurantList(_.uniqBy(routeHistoryResponse['data'].filter(node=>node.nodetype==0), function(p){ return p.price; }));

            noti('success', t(`Loaded ${routeHistoryResponse.data.length} Records!`, `已載入${routeHistoryResponse.data.length}筆記錄`));
            // if (routeHistoryResponse.data[0]) {
            //     setData(routeHistoryResponse.data);
            //     const center = [routeHistoryResponse.data[0].lat, routeHistoryResponse.data[0].long]
            // }

        } catch (e) {
            noti('error', e.toString());
        }
    }
    function renderValue(value){
        console.log(value);
        return value;
    }
    console.log(driverIDList);
    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem>
                        <KeyboardDateTimePicker
                            {...from}
                            label={t('From','From')}
                            // 8 Jan 2020, foxeye.rinx:
                            // event there is no error, the component still call this
                            // onError={console.error}
                            // the problem come from the lib, just wait for newer version
                            minDate={new Date("2019-01-01T00:00")}
                            format="yyyy/MMM/dd   hh:mm a"
                        />
                    </ListItem>
                    <ListItem>
                        <KeyboardDateTimePicker
                            {...to}
                            label={t('To','To')}
                            // 8 Jan 2020, foxeye.rinx:
                            // event there is no error, the component still call this
                            // onError={console.error}
                            // the problem come from the lib, just wait for newer version
                            minDate={new Date("2019-01-01T00:00")}
                            format="yyyy/MMM/dd   hh:mm a"
                        />
                    </ListItem>
                    <ListItem>
                        <Grid container spacing={5}>
                            <Grid item>
                                    <Grid container spacing={5}>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="select-vehicle">{t('Select City', 'Select City')}</InputLabel>
                                                <Select
                                                    // native
                                                    labelId="select-city"
                                                    value={currentCityLabel}
                                                    onChange={handleChangeCity}
                                                    renderValue={() => renderValue(currentCityLabel)}
                                                >
                                                    {cityList?.map((city, index) =>(
                                                        // <optgroup key={index} label={city?.City_Name}>
                                                        //     {city.map(({registrationNumber: r}, index) => (<option key={index} value={index}>city?.City_Name</option>)
                                                        //     )}
                                                        // </optgroup>
                                                        <MenuItem
                                                            value={index}
                                                        >
                                                            {city?.City}
                                                        </MenuItem>

                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="select-vehicle">{t('Select Method', 'Select Method')}</InputLabel>
                                                <Select
                                                    // native
                                                    labelId="select-method"
                                                    value={methodList[currentMethod]?.name}
                                                    onChange={handleChangeMethod}
                                                    renderValue={() => renderValue(methodList[currentMethod]?.name)}
                                                >
                                                    {methodList?.map((method, index) =>(
                                                        // <optgroup key={index} label={city?.City_Name}>
                                                        //     {city.map(({registrationNumber: r}, index) => (<option key={index} value={index}>city?.City_Name</option>)
                                                        //     )}
                                                        // </optgroup>
                                                        <MenuItem
                                                            value={index}
                                                            className="d-flex justify-content-between"
                                                            style={{ width: "170px" }}
                                                        >
                                                            {method?.name}
                                                        </MenuItem>

                                                    ))}
                                                </Select>
                                            </FormControl>

                                        </Grid>
                                    </Grid>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={()=>submit()}
                        >
                            {t('Load ', 'Load ')}
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Typography gutterBottom>
                                    {t('Fast', 'Fast')}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <MySlider
                                    // valueLabelFormat={value => 950 - value}
                                    className={classes.slider}
                                    value={delay}
                                    valueLabelDisplay="auto"
                                    onChange={handleChange}
                                    step={10}
                                    min={1}
                                    max={500}
                                />
                            </Grid>
                            <Grid item xs>
                                <Typography gutterBottom>
                                    {t('Slow', 'Slow')}
                                </Typography>
                            </Grid>
                            <PlayButton
                                onClick={play}
                            >
                                <PlayArrowIcon />
                            </PlayButton>
                            <PauseButton
                                onClick={pause}
                            >
                                <PauseIcon />
                            </PauseButton>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <ModifiedMatTable
                    title={t('History Data', 'History Data')}
                    columns={columns}
                    data={data}
                    options={{
                        search: false,
                        rowStyle: rowData => rowData.speed > speedLimit ? { backgroundColor: 'red' } : null
                    }}
                />
            </Drawer>
            <main
                className={clsx(classes.content, {[classes.contentShift]: open,})}
            >
                <div className={classes.drawerHeader} />
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>

                {currentSelectedCity &&

                <MapContainer

                            center={[cityList[currentSelectedCity]?.Latitude,cityList[currentSelectedCity]?.Longitude]}
                            zoom={13}
                            scrollWheelZoom={false}
                            className={classes.map}
                            whenCreated={ mapInstance => { mapRef.current = mapInstance } }
                >
                    <TileLayer
                        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        zoomControl="false"
                        maxZoom="28"
                    />
                    {/*{driverIDList.length>0 && driverIDList?.map((driver,index)=>(*/}
                    {/*    <Polyline color="red" positions={driverIDList[index]?.dataTime} />))*/}
                    {/*}*/}
                    {driverIDList.length>0 && driverIDList?.map((driver,index)=>(

                            <Marker
                                icon={L.icon({ iconUrl: carIcon })}
                                position={[driver.dataTime[0].Latitude,driver.dataTime[0].Longitude]}
                            >
                                {/*<Tooltip permanent direction='left'>{t('Start point', 'Start point')}</Tooltip>*/}
                            </Marker>))
                    }
                    {
                        routeHistoryList.length>0 && routeHistoryList?.map(node=>(
                        <Marker
                        icon={L.icon({
                            iconUrl: (node.nodetype==0?LocalShippingIcon:storeIcon),
                            iconSize: new L.Point(35, 50)
                        })}
                        position={[node.Latitude,node.Longitude]}

                        >
                    {/*<Tooltip permanent direction='left'>{t('Start point', 'Start point')}</Tooltip>*!/*/}
                        </Marker>))
                    }
                    {driverIDList[driverIDList.length - 1] && driverIDList?.map((driver,index)=>(
                            <Marker
                                icon={L.icon({ iconUrl: endIcon })}
                                position={[driver.dataTime[driver.dataTime.length-1].Latitude,
                                            driver.dataTime[driver.dataTime.length-1].Longitude]}
                            >
                                {/*<Tooltip permanent direction='left'>{t('End point', 'End point')}</Tooltip>*/}
                            </Marker>
                        ))
                    }
                    {
                        driverIDList.length>0 && driverIDList.map((driver,index)=>(
                            <ReactLeafletDriftMarker
                                position={
                                    {
                                        lat:driver.dataTime[timePosition].Latitude,
                                        lng:driver.dataTime[timePosition].Longitude,
                                    }
                                }

                                // time in ms that marker will take to reach its destination
                                duration={1000}
                                icon={L.icon({ iconUrl: carSideIcon })} >
                                keepAtCenter={false}
                                {/*<Popup>Hi this is a popup</Popup>*/}
                                {/*<Tooltip>Hi here is a tooltip</Tooltip>*/}
                            </ReactLeafletDriftMarker>
                        ))
                    }

                    {/*<ResultDialog*/}
                    {/*    handleClickOpen={()=>handleClickOpen()}*/}
                    {/*    open ={openDialog}*/}
                    {/*    handleClose ={()=>handleClose()}*/}
                    {/*    fullWidth ={fullWidthDialog}*/}
                    {/*    maxWidth ={maxWidthDialog}*/}
                    {/*    handleMaxWidthChange = {()=>handleMaxWidthChange()}*/}
                    {/*    handleFullWidthChange = {()=>handleFullWidthChange()}*/}
                    {/*/>*/}
                </MapContainer>}
            </main>
        </div>
    );
}
