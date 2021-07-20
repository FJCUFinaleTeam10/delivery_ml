import React from "react";
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AppScaffold from "./layout/AppScaffold";
import "./style/style.scss";
import Login from "./page/Login";

export default function App(props) {
  return (
    <Router>
      <AppScaffold>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/error" exact>
            <Typography variant="h1" color="error">
              Something went wrong!!
              <Link to="/">Home</Link>
            </Typography>
          </Route>
          <Route path="/" exact>
            <Typography variant="h1" color="primary">
              Welcome to food delivery  app
            </Typography>
          </Route>
          <Route path="*">Page not found!</Route>
        </Switch>
      </AppScaffold>
    </Router>
  );
}

