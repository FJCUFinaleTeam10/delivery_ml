import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.common.white,
  }
}));

export default function NavLink({ to = "/", title = "Home", children }) {
  const classes = useStyles();
  return (
    <Button color="white" component={RouterLink} to={to}>
      <Typography className={classes.text} variant="button">
        {children}
      </Typography>
    </Button>
  );
}
