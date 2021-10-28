import React from "react";
import Gear from '../asset/images/gear.jpg';
import clsx from "clsx";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import StorageIcon from "@material-ui/icons/Storage";
import CommuteIcon from "@material-ui/icons/Commute";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar,
  IconButton,
  Toolbar,
  makeStyles,
  Avatar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  Divider,
  Button,
  Box,
  useTheme,
  Tooltip,
} from "@material-ui/core";
import {
  MenuOutlined,
  ChevronRight,
  ChevronLeft,
  CloseOutlined,
  LibraryBooks,
  Dashboard,
  AccountBox,
} from "@material-ui/icons";
import SearchBox from "../component/SearchBox";
import NavLink from "../component/NavLink";
import { useState } from "react";
import SimpleLink from "../component/SimpleLink";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginleft: 36,
  },
  expanded: {
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  hide: {
    display: "none",
  },
  list: {
    width: drawerWidth,
  },
  fullList: {
    width: "auto",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerContainer: {
    overflow: "auto",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  gear: {
    maxWidth: "100%",
    transition: theme.transitions.create(["max-width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  gearClose: {
    maxWidth: 0,
  },
}));

function AppScaffold(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openBasic, setOpenBasic] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleBasic = () => {
      setOpenBasic(!openBasic);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          // [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Button
            edge="start"
            color="inherit"
            aria-label="Menu"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            className={clsx(classes.menuButton)}
          >
            {open ? <CloseOutlined /> : <MenuOutlined />}
            <Typography variant="subtitle1" color="white">
              {open ? "Collapse" : "Expand"}
            </Typography>
          </Button>

          <div className={classes.expanded}></div>
          <div style={{ marginRight: "0.5em" }}>
            <SearchBox />
          </div>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/restaurantlist">Restaurants</NavLink>
          <Avatar src="https://avatars.githubusercontent.com/u/52750799?v=4" />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={clsx(classes.toolbar, classes.drawerContainer)}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <div
          className={clsx(classes.list, classes.fullList)}
          role="presentation"
          // onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <Box>
            <img
              src={Gear}
              alt="Gear"
              className={clsx(classes.gear, {
                [classes.gearClose]: !open,
              })}
            />
          </Box>
          <Divider />
          <List>
            <Tooltip title="Statistics" dir="right" arrow placement="right">
              <SimpleLink to="./statistic">
                <ListItem className={classes.listItem} button>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText inset primary="Statistics" />
                </ListItem>
              </SimpleLink>

            </Tooltip>
            <Tooltip title="basic" dir="right" arrow placement="right">
              <ListItem
                className={classes.listItem}
                button
                onClick={handleBasic}
              >
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary="Basic Manager" />
                {openBasic ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Tooltip>
            <Collapse in={openBasic} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <SimpleLink to ='/driverList'>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <CommuteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Car management" />
                  </ListItem>
                </SimpleLink>
                <SimpleLink to="/restaurantlist">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <RestaurantIcon />
                    </ListItemIcon>
                    <ListItemText primary="Restaurant Management" />
                  </ListItem>
                </SimpleLink>
                <SimpleLink to="/orderlist">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ShoppingBasketIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Order Management" />
                  </ListItem>
                </SimpleLink>

              </List>
            </Collapse>

            <Tooltip title="Setting" arrow placement="right">
              <SimpleLink to="/setting">
                <ListItem className={classes.listItem} button>
                  <ListItemIcon>
                    <SettingsIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Setting" />
                </ListItem>
              </SimpleLink>
            </Tooltip>
          </List>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}

export default AppScaffold;
