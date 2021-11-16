import React, {useEffect, useState} from 'react';
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
    Polyline,
    Marker,
    Tooltip
} from 'react-leaflet';
import { DriftMarker } from 'leaflet-drift-marker';
import 'leaflet/dist/leaflet.css';
import startIcon from '../asset/images/begin.png';
import endIcon from '../asset/images/end.png';
import carSideIcon from '../asset/images/vehicle.png';
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
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { DateTime } from 'luxon';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

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
    root: {
        display: 'flex',
    },
    map: {
        height: `80vh`
    },
    formControl: {
        minWidth: 150
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

const taipei = [25.105497, 121.597366];
export default () => {
    const classes = useStyles();
    const [speedLimit, setSpeedLimit] = useState(70);
    const [data, setData] = useState([]);
    const polyline = data.filter(i => i.lat && i.long).map(d => [d.lat, d.long]);
    const [vehiclePos, setVehiclePos] = useState(polyline[0]);
    const [currentSelectedCity,setCurrentSelectedCity]= useState(0);
    const [viewport, setViewport] = useState({
        center: currentSelectedCity || taipei,
        zoom: 15,
    });
    const [open, setOpen] = useState(true);
    const [delay, setDelay] = useState(50);
    const [index, setIndex] = useState(0);
    const theme = useTheme();
    const axios = createAxios();
    const t = useTrans();
    const noti = useNoti();
    const fleets = useVehicleData(true);
    const initialDate = new Date('2019-01-01T00:00');
    const select = useNativeSelect('');
    const from = useDateTimePicker(initialDate);
    const to = useDateTimePicker(new Date());
    const [isRunning, setIsRunning] = useState(false);
    const [cityList,setCityList] = useState([]);

    useEffect(()=>{
            async function fetchCity(){
                const response = await geolocationApi.getAllCity();
                setCityList(response);
            };
            fetchCity();
    },[]);

    useEffect(()=>{
        setViewport();
    },[cityList]);
    useEffect(()=>{
        console.log(currentSelectedCity);
    },[currentSelectedCity]);


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
        { title: t('Address', 'ddress'), field: 'address' }
    ];
    useInterval(() => {
        const next = polyline[index + 1];
        if (!next) {
            setIsRunning(false);
            return;
        }
        setVehiclePos(next);
        // setViewport(prev => ({ ...prev, center: next}));
        setIndex(index + 1);
    }, isRunning ? delay : null);

    function play() {setIsRunning(true);}
    function pause() {setIsRunning(false);}
    const handleChange = (event, newValue) => {setDelay(newValue);};
    const handleSpeedLimitChange = (event) => {setSpeedLimit(event.target.value);};
    const handleDrawerOpen = () => {setOpen(true);};
    const handleDrawerClose = () => {setOpen(false);};
    const onViewportChanged = (viewport) => {setViewport(viewport)}
    const submit = async (event) => {
        try {
            const response = await axios.get(`/journey-detail-report`, {
                params: {
                    registrationNumber: select.value,
                    from: from.value,
                    to: to.value
                }
            });
            const length = response.data.length;
            if (length > 0) {
                response.data = response.data.map(x => Object.assign(x, {
                    _trackerTime: DateTime.fromISO(x.trackerTime).toFormat('hh:mm:ss dd-MMM-yyyy')
                }));
            }
            noti('success', t(`Loaded ${length} Records!`, `已載入${length}筆記錄`));
            if (response.data[0]) {
                setData(response.data);
                const center = [response.data[0].lat, response.data[0].long];
                setViewport(prev => ({ ...prev, center }));
            }
        } catch (e) {
            noti('error', e.toString());
        }
    }
    return (
        <div className={classes.root}>
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
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-vehicle">{t('Select City', 'Select City')}</InputLabel>
                                    <Select
                                        {...cityList[currentSelectedCity]}
                                        native
                                        labelId="select-city"
                                    >
                                        <option value="" />
                                        {/*{cityList &&*/}
                                        {/*<React.Fragment>*/}
                                        {/*    {cityList?.map((city, index) => (*/}
                                        {/*        <optgroup key={index} label={city?.City_Name}>*/}
                                        {/*            {city.map(({registrationNumber: r}, index) => (<option key={index} value={index}>city?.City_Name</option>)*/}
                                        {/*            )}*/}
                                        {/*        </optgroup>*/}
                                        {/*    ))}*/}
                                        {/*</React.Fragment>*/}
                                        {/*}*/}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField
                                    label={t('Speed limit', 'Speed limit')}
                                    type="number"
                                    style={{maxWidth: 120}}
                                    defaultValue={speedLimit}
                                    InputLabelProps={{shrink: true}}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"> km/h </InputAdornment>
                                    }}
                                    onChange={handleSpeedLimitChange}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={submit}
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
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
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
                {viewport && <MapContainer className={classes.map}
                                  onViewportChanged={onViewportChanged}
                                  viewport={viewport}
                >
                    <TileLayer
                        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        zoomControl="false"
                        maxZoom="28"
                        attribution="&copy; Jasslin Map"
                    />
                    {polyline[0] && <Polyline color="red" positions={polyline} />}
                    {polyline[0] && <Marker
                        icon={L.icon({ iconUrl: startIcon })}
                        position={polyline[0]}
                    >
                        <Tooltip permanent direction='left'>{t('Start point', 'Start point')}</Tooltip>
                    </Marker>}
                    {polyline[polyline.length - 1] && <Marker
                        icon={L.icon({ iconUrl: endIcon })}
                        position={polyline[polyline.length - 1]}
                    >
                        <Tooltip permanent direction='left'>{t('End point', 'End point')}</Tooltip>
                    </Marker>}
                    {vehiclePos && <DriftMarker
                        // if position changes, marker will drift its way to new position
                        position={vehiclePos}
                        // time in ms that marker will take to reach its destination
                        duration={1}
                        icon={carIcon}>
                        <Tooltip permanent direction='right'>{select.value}</Tooltip>
                    </DriftMarker>}
                </MapContainer>}
            </main>
        </div>
    );
}
