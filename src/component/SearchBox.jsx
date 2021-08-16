import { InputBase, makeStyles, Box, alpha } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    // paddingLeft: '1rem'
  },
  searchIcon: {
    position: "absolute",
    color: theme.palette.common.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: "inherit",
    padding: theme.spacing(0, 2),
    pointerEvents: "none",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  inputRoot: {
    color: "inherit",
  },
}));

/**
 *
 * @param { { placeHolder?: string, label?: string, onSubmit?: Function, onChange?: Function, [P: string]: any } props
 * @returns
 */
export default function SearchBox(props) {
  const {
    placeHolder = "Search...",
    label = "Search",
    onChange = (e) => {
      console.log(e.target.value);
    },
    onSubmit = e => {
      e.preventDefault();
      console.log(e.target.value);
    },
  } = props;

  const classes = useStyles();

  return (
    <Box className={classes.container} borderRadius={8}>
      <div className={classes.searchIcon}>
        <SearchOutlined />
      </div>
      <InputBase
        placeholder={placeHolder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": label }}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        {placeHolder}
      </InputBase>
    </Box>
  );
}
