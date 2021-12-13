import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme, createStyles, withStyles} from '@material-ui/core/styles';
import Dialog from '@mui/material/Dialog';
import 'leaflet/dist/leaflet.css';
import carSideIcon from '../asset/images/vehicle.png';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import MenuItem from "@mui/material/MenuItem";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import {Box, FormControlLabel} from "@material-ui/core";

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









export default function ResultDialog(props){
    const classes = useStyles();
    const {handleClickOpen} = props
    const {open} = props;
    const {handleClose} =props;
    const {fullWidth} = props;
    const {maxWidth} =props;
    const {handleMaxWidthChange} = props;
    const {handleFullWidthChange} = props;
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open max-width dialog
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Optional sizes</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can set my maximum width and whether to adapt or not.
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                            <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                            <Select
                                autoFocus
                                value={maxWidth}
                                onChange={handleMaxWidthChange}
                                label="maxWidth"
                                inputProps={{
                                    name: 'max-width',
                                    id: 'max-width',
                                }}
                            >
                                <MenuItem value={false}>false</MenuItem>
                                <MenuItem value="xs">xs</MenuItem>
                                <MenuItem value="sm">sm</MenuItem>
                                <MenuItem value="md">md</MenuItem>
                                <MenuItem value="lg">lg</MenuItem>
                                <MenuItem value="xl">xl</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            sx={{ mt: 1 }}
                            control={
                                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
                            }
                            label="Full width"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
