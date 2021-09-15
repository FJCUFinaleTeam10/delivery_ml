import React, { useState, useEffect } from 'react';
import Table from './Table';
import MaterialTable from 'material-table';
import { Checkbox, Select, MenuItem, withWidth, Tooltip } from '@material-ui/core';
import { SettingsSystemDaydream } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const orderList = [
  {
    "id": "612dbf3dafae49623357de4f",
    "order_approved_at": "2017-10-02 11:07:15",
    "order_customer_Latitude": 27.542221,
    "order_customer_Longitude": 77.8997221,
    "order_delivered_customer_date": "2017-10-10 21:25:13",
    "order_estimated_delivery_date": "2017-10-18 00:00:00",
    "order_request_time": "2017-10-18 07:00:00",
    "order_restaurant_carrier_date": "2017-10-04 19:55:00",
    "order_restaurant_carrier_restaurantId": "3400391",
    "driver_id": "6134398187af41afea62f825",
    "order_status": "delivered"
  },
  {
    "id": "613882031bb2bbefaf7542c2",
    "order_approved_at": "2018-07-26 03:24:27",
    "order_customer_Latitude": 27.26668,
    "order_customer_Longitude": 78.12254,
    "order_delivered_customer_date": "2018-08-07 15:27:45",
    "order_estimated_delivery_date": "2018-08-13 00:00:00",
    "order_request_time": "2018-08-14 09:00:00",
    "order_restaurant_carrier_date": "2018-07-26 14:31:00",
    "order_restaurant_carrier_restaurantId": "3400350'",
    "driver_id": "6134398187af41afea62f829",
    "order_status": "delivered"
  }
]

function SystemTable() {
  const [filterState, setFilterState] = useState(orderList)
  const [filter, setFilter] = useState(true)
  const [orderState, setOrderState] = useState('all')
  const columns = [
    { title: "Order ID", field: "id" },
    { title: "Order Approved", field: "order_approved_at" },
    { title: "Order Latitude", field: "order_customer_Latitude" },
    { title: "Order Longitude", field: "order_customer_Longitude" },
    { title: "Delivered Customer Date", field: "order_delivered_customer_date" },
    { title: "Oestimated Delivery Date", field: "order_estimated_delivery_date" },
    { title: "Request Time", field: "order_request_time" },
    { title: "Restaurant Carrier Date", field: "order_restaurant_carrier_date" },
    { title: "Restaurant ID", field: "order_restaurant_carrier_restaurantId" },
    { title: "Driver ID", field: "driver_id" },
    { title: "Order Status", field: "order_status" }

  ]
  const handleChange = () => {
    setFilter(!filter)
  }

  useEffect(() => {
    setFilterState(orderState === 'all' ? orderList : orderList.filter(dt => dt.order_status === orderState))
  }, [orderState])

  return (
    <div>
      <h1 align="center">System Table</h1>
      <h4 align="center">Filtering in Material Table</h4>

      
      <MaterialTable
        title="Order Data"
        data={filterState}
        columns={columns}
        options={{
          filtering: filter
        }}
        actions={[
          {
            icon: () => <Checkbox
              color="default"
              checked={filter}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'checkbox with default color' }}
            />,
            tooltip: "Hide/Show Filter option",
            isFreeAction: true
          },
          {
            icon:()=> <FormControl >
            <InputLabel htmlFor="name-native-error">Name</InputLabel>
            <NativeSelect
              value={orderState}
              onChange={(e) => setOrderState(e.target.value)}
              name="name"
              inputProps={{
                id: 'name-native-error',
              }}
            >
              <option value="delivered">Delivery</option>
              <option value="undelivered">UnDelivery</option>
              <option value="all">All</option>
    
            </NativeSelect>
          </FormControl>,
          tooltip:"Filter order state",
          isFreeAction: true
          }
        ]}
      />
    </div>

  );
}
export default SystemTable;
