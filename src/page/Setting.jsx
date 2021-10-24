import React, { useEffect, useState } from "react";
import {makeStyles, TableCell, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import CircularLoading from '../../component/CircularLoading';
import geolocationApi from "../../services/geolocationApi";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableCustomeCell from "./TableCustomeCell";
import TablePagination from '@mui/material/TablePagination';
import orderApi from "../../services/orderApi.js";
const useStyles = makeStyles((theme) => ({
}));

export default function Setting() {

    const [orderList,setOrderList] = useState([]);
    const [currentPage,setCurrentPage] = useState(0);
    const [pageSize,setPageSize] = useState(10);
    const [cityList,setCityList] = useState([]);
    const [selectedCity,setSelectedCity] = useState({
        Latitude: 23.553118,
        Longitude: 121.0211024,
        City:"Agra"
    });


    return (
        <div>
            {orderList.length>0 && selectedCity !== undefined ?(
               <Typography>"hello world"</Typography>
            ):(
                <CircularLoading/>
            )}
        </div>
    );
}
