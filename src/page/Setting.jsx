import React, { useEffect, useState } from "react";
import {makeStyles, Paper, Snackbar, TableCell, Typography} from "@material-ui/core";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import settingApi  from "../services/settingApi";
import CircularLoading from "../component/CircularLoading";
import geolocationApi from "../services/geolocationApi";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Alert} from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
}));

export default function Setting() {


    const [setting,setSetting] = useState(null);

    const [currentCity, setCurrentCity] = React.useState(null);
    const [cityList, setCityList] = React.useState([]);
    const [openSnackBar,setOpenSnackBar] = useState(false);
    useEffect(()=>{
        async function fetchCity(){
            const response = await geolocationApi.getAllCity();
            setCityList(response);
        };

        fetchCity();
    },[]);
    useEffect(()=>{
        console.log(setting);
    },[setting]);
    useEffect(()=>{
        console.log(cityList);
        setCurrentCity(0);
    },[cityList]);

    useEffect(()=>{
        async function fetch_Setting(){
            try {
                const response = await settingApi.getSettingBaseOneCity({city:cityList[currentCity]?.City});
                setSetting(response[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetch_Setting();
    },[currentCity]);

    const handleChangeCity =(event)=>{
        setCurrentCity(event.target.value);
        console.log(event.target);
    }

    const handleChange = (prop) => (event) => {
        setSetting({ ...setting, [prop]: event.target.value });
    };
    const changebuffer =(e,props)=>{
        setSetting({ ...setting, [props]: e.target.value });
    }
    const handleClose= ()=>{
        setOpenSnackBar(!openSnackBar);
    }
    const handleClick = ()=>{
        async function sendingSetting(){
            try {
                const params = JSON.parse(JSON.stringify(setting));
                console.log(params);
                const response = await settingApi.updateSetting(params);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        sendingSetting();
        setOpenSnackBar(!openSnackBar);
    }
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel
                    focused
                    id="demo-simple-select-helper-label" >City</InputLabel>
                <Select
                    focused
                    labelId="demo-simple-select-helper-label"
                    id={currentCity}
                    value={currentCity}
                    label="current City"
                    onChange={(e)=>handleChangeCity(e)}
                >
                    {cityList.map((city,index)=>{
                       return <MenuItem value={index} name={city?.City}>{city?.City}</MenuItem>
                    })}
                </Select>
                <FormHelperText>select city's setting</FormHelperText>
            </FormControl>
            <Paper>
                {setting!== undefined ?(
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={2} sm={4} md={4} key={1}>
                                    <TextField
                                        focused
                                        label="capacity"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        value={setting?.capacity}
                                        onChange={(e)=>changebuffer(e,'capacity')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">order/perCar</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={4} md={4} key={2}>
                                    <TextField
                                        focused
                                    label="deadline Time"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '25ch' }}
                                    value={setting?.deadlineTime}
                                    onChange={(e)=>changebuffer(e,'deadlineTime')}
                                    InputProps={{
                                    endAdornment: <InputAdornment position="start">order/perCar</InputAdornment>,
                                }}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={4} md={4} key={3}>
                                    <TextField
                                        focused
                                        label="delay Time"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        value={setting?.delay}
                                        onChange={(e)=>changebuffer(e,'delayTime')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">seconds</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={4} md={4} key={4}>
                                    <TextField
                                        focused
                                        label="maxLength Postponement"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        value={setting?.maxLengthPost}
                                        onChange={(e)=>changebuffer(e,'maxLengthPost')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">order</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={4} md={4} key={5}>
                                    <TextField
                                        focused
                                        label="Restaurant PrepareTime"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        onChange={(e)=>changebuffer(e,'restaurantPrepareTime')}
                                        value={setting?.restaurantPrepareTime}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">seconds</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                            <Grid item xs={2} sm={4} md={4} key={6}>
                                <TextField
                                    focused
                                    label="t_Pmax"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '25ch' }}
                                    onChange={(e)=>changebuffer(e,'t_Pmax')}
                                    value={setting?.t_Pmax}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">seconds</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4} key={7}>
                                <TextField
                                    focused
                                    label="t_ba"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '25ch' }}
                                    onChange={(e)=>changebuffer(e,'t_ba')}
                                    value={setting?.t_ba}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">seconds</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4} key={8}>
                                <TextField
                                    focused
                                    label="velocity"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '25ch' }}
                                    onChange={(e)=>changebuffer(e,'velocity')}
                                    value={setting?.velocity}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">m/s</InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <div>
                        </div>
                    </Box>
                ):(
                    <CircularLoading/>
                )}
            </Paper>
            <Button variant="contained" color="success" onClick={handleClick}>Update</Button>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Update Success!
                </Alert>
            </Snackbar>
        </div>

    );
}
