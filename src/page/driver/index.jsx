import React, { useEffect, useState } from "react";
import {Container, makeStyles, TableCell} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import driverApi  from "../../services/driverApi";
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
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles((theme) => ({

}));


export default function Driver() {
  const classes = useStyles();
  const [driverList,setDriverList] = useState([]);
  const [currentPage,setCurrentPage] = useState(0);
  const [pageSize,setPageSize] = useState(10);
  const [cityList,setCityList] = useState([]);
  const [selectedCity,setSelectedCity] = useState({
    Latitude: 23.553118,
    Longitude: 121.0211024,
    City:"Arga"
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
    setSelectedCity(cityList[0]?.City);
  },[cityList]);

  useEffect(()=>{
    console.log(selectedCity);
    async function fetch_driver_list(){
      try {
        const params = {
          skip: currentPage,
          limit: pageSize,
          city: selectedCity,
        }
        console.log(params);
        const response = await  driverApi.getDriverBaseOnCity(params);
        setDriverList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetch_driver_list();
  },[selectedCity,pageSize,currentPage]);





  useEffect(()=>{
    console.log(driverList);
  },[driverList]);


  const handleClick = ()=>{

  }
  const handleChangePage = (e,pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  const handleChangeRowsPerPage=(e)=>{
    console.log(e);
    setPageSize(e.target.value);
  }
  const handleChangeSearch=(e)=>{
    setSelectedCity(e.target.value);
  }
  return (
    <div>
      {driverList.length>0 && selectedCity !== undefined ?(
          <React.Fragment>
              <form  noValidate autoComplete="on">
                <TextField
                    id="country-search"
                    select
                    label="Select"
                    value={selectedCity}
                    onChange={handleChangeSearch}
                    helperText="select country"
                >
                  {cityList.map((city,index) => (
                      <MenuItem key={index} value={city.City}>
                        {city.City}
                      </MenuItem>
                  ))}
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleClick()}
                >
                  Search
                </Button>
              </form>
            {/*<Autocomplete*/}
            {/*    id="disabled-options-demo"*/}
            {/*    options={[...cityList].map((city)=>{*/}
            {/*      return city.City;*/}
            {/*    })}*/}
            {/*    getOptionDisabled={(option) => option === cityList[0] || option === cityList[2]}*/}
            {/*    sx={{ width: 300 }}*/}
            {/*    renderInput={(params) => <TextField {...params} label="Disabled options" />}*/}
            {/*/>*/}
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
        <TableHead>
        <TableRow>
        <TableCell />
        <TableCell align="right">Driver ID</TableCell>
        <TableCell align="right">Country Code</TableCell>
        <TableCell align="right">City</TableCell>
        <TableCell align="right">Longitude</TableCell>
        <TableCell align="right">Latitude</TableCell>
        <TableCell align="right">Velocity</TableCell>
        <TableCell align="right">Capacity</TableCell>
        <TableCell align="right">Reward</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
      {driverList.map((driver) => (
        <TableCustomeCell key = {driver.id} driver={driver}/>
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
      ):(
        <CircularLoading/>
      )}
    </div>
  );
}
