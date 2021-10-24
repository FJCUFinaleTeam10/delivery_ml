import React, { useEffect, useState } from "react";
import {makeStyles, TableCell} from "@material-ui/core";
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

export default function Order() {

    const [orderList,setOrderList] = useState([]);
    const [currentPage,setCurrentPage] = useState(0);
    const [pageSize,setPageSize] = useState(10);
    const [currentOrder,setCurrentOrder] = useState(null);
    const [cityList,setCityList] = useState([]);
    const [selectedCity,setSelectedCity] = useState({
        Latitude: 23.553118,
        Longitude: 121.0211024,
        City:"Agra"
    });

    useEffect(()=>{
        async function fetchCity(){
            const response = await geolocationApi.getAllCity();
            setCityList(response);
        };
        fetchCity();
    },[]);

    useEffect(()=>{
        console.log(cityList);
        setCurrentOrder(cityList[0]);
    },[cityList]);

    useEffect(()=>{
        console.log(selectedCity);
        async function fetch_order_list(){
            try {
                const params = {
                    skip: currentPage,
                    limit: pageSize,
                    city: selectedCity.City,
                }
                console.log(params);
                const response = await   orderApi.getOrderBaseOnCity(params);
                setOrderList(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetch_order_list();
    },[cityList,pageSize,currentPage]);



    useEffect(()=>{
        console.log(orderList);
    },[orderList]);

    const handleClick = ()=>{

    }
    const handleChangePage = (e,pageNumber)=>{
        setCurrentPage(pageNumber);
    }
    const handleChangeRowsPerPage=(e)=>{
        console.log(e);
        setPageSize(e.target.value);
    }
    const handleChangeSearch=()=>{

    }
    const classes = useStyles();

    const renderSearch = ()=>{
        return(
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        value={selectedCity}
                        onChange={handleChangeSearch}
                        helperText="Please select your currency"
                    >
                        {cityList.map((city,index) => (
                            <MenuItem key={index} value={city.CityId}>
                                {city.City}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => handleClick()}
                    >
                        create Order
                    </Button>
                </div>
            </form>
        );
    };
    const renderTable=()=>{
        return(
            <React.Fragment>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />

                                <TableCell align="right"> Order ID</TableCell>
                                <TableCell align="right">approved time</TableCell>
                                <TableCell align="right">Latitude</TableCell>
                                <TableCell align="right">Longitude</TableCell>
                                <TableCell align="right">order delivered customer date</TableCell>
                                <TableCell align="right">order estimated delivery date</TableCell>
                                <TableCell align="right">order request time</TableCell>
                                <TableCell align="right">order restaurant carrier date</TableCell>
                                <TableCell align="right">order restaurant carrier restaurantId</TableCell>
                                <TableCell align="right">customer phone number</TableCell>
                                <TableCell align="right">driver id</TableCell>
                                <TableCell align="right">order status</TableCell>
                                <TableCell align="right">Qtable position</TableCell>
                                <TableCell align="right">Qtable updated</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderList.map((order) => (
                                <TableCustomeCell key = {order.id} order={order}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination component="div"
                                 count={100}
                                 page={currentPage}
                                 onPageChange={(e,pageNumber)=>handleChangePage(e,pageNumber)}
                                 rowsPerPage={pageSize}
                                 onRowsPerPageChange={(e)=>handleChangeRowsPerPage(e)}
                />
            </React.Fragment>

        );
    }


    return (
        <div>
            {orderList.length>0 && selectedCity !== undefined ?(
                renderSearch, renderTable()
            ):(
                <CircularLoading/>
            )}
        </div>
    );
}
