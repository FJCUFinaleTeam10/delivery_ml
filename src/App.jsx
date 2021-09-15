import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AppScaffold from "./layout/AppScaffold";
// import "./style/style.scss";
import Login from "./page/Login";
import Home from "./page/home";
import _ from "lodash";
import L from "leaflet";
import Restaurants from './page/restaurant';
import RestaurantList from './page/restaurant/RestaurantList';
import OrderList from './page/order/orderList';
import OrderInformation from './page/order/orderInformation';
import SystemTable from './page/order/SystemTable';

export default function App(props) {
  return (
    <Router>
      <AppScaffold>
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/restaurantlist" exact>
            <RestaurantList />
          </Route>
          <Route path="/error" exact>
            <Typography variant="h1" color="error">
              Something went wrong!!
              <Link to="/">Home</Link>
            </Typography>
          </Route>
          <Route path="/restaurant/:id" exact>
            <Restaurants/>
          </Route>
          <Route path="/orderList" exact>
            <OrderList />
          </Route>
          <Route path="/orderInformation" exact>
            <OrderInformation />
          </Route>
          <Route path="/SystemTable" exact>
            <SystemTable />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*">Page not found!</Route>
        </Switch>
      </AppScaffold>
    </Router>
  );
}

