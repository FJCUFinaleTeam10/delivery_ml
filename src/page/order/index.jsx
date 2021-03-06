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
    const [total,setTotal] = useState(null);
    const [selectedCity,setSelectedCity] = useState({
        Latitude: 23.553118,
        Longitude: 121.0211024,
        City:"Agra",
        City_id :1
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
                    city: selectedCity?.City,
                    cityId: selectedCity?.City_id,
                }
                console.log(params);
                const response = await   orderApi.getOrderBaseOnCity(params);
                setOrderList(response['data']);
                setTotal(response['count']);
            } catch (error) {
                console.log(error);
            }
        };
        fetch_order_list();
    },[cityList,pageSize,currentPage]);



    useEffect(()=>{
        console.log(orderList);
    },[orderList]);

    const handleClick = ()=>{}
    const handleChangePage = (e,pageNumber)=>{setCurrentPage(pageNumber);}
    const handleChangeRowsPerPage=(e)=>{
        console.log(e);
        setPageSize(e.target.value);
    }
    const handleChangeSearch=()=>{}
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
                                <TableCell align="right">Assigned Time</TableCell>
                                <TableCell align="right">Latitude</TableCell>
                                <TableCell align="right">Longitude</TableCell>
                                <TableCell align="right">Real-Time Delivered Time</TableCell>
                                <TableCell align="right">Estimated Delivered Time</TableCell>
                                <TableCell align="right">Requested Time</TableCell>
                                <TableCell align="right">Get Package Time</TableCell>
                                <TableCell align="right">Restaurant Id</TableCell>
                                <TableCell align="right">Driver Id</TableCell>
                                <TableCell align="right">Order Status</TableCell>
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
                                 count={total}
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
