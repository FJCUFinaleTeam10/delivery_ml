import React from "react";
import Gear from '../asset/images/gear.jpg';
import clsx from "clsx";
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
  QuestionAnswer,
  LibraryBooks,
  DoneAll,
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
    marginleft:36,
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
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
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
          <NavLink to="/error">Error</NavLink>
          <NavLink to="/e">Home</NavLink>
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
          onClick={handleDrawerClose}
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
              <SimpleLink to="/dashboard/statistic">
                <ListItem className={classes.listItem} button>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Statistics"/>
                </ListItem>
              </SimpleLink>
            </Tooltip>
            <Tooltip title="Quizzes" arrow placement="right">
              <SimpleLink to="/dashboard/quizzes">
                <ListItem className={classes.listItem} button>
                  <ListItemIcon>
                    <QuestionAnswer />
                  </ListItemIcon>
                  <ListItemText primary="Quizzes" />
                </ListItem>
              </SimpleLink>
            </Tooltip>
            <Tooltip title="Tests" arrow placement="right">
              <SimpleLink to="/dashboard/tests">
                <ListItem className={classes.listItem} button>
                  <ListItemIcon>
                    <DoneAll />
                  </ListItemIcon>
                  <ListItemText primary="Tests" />
                </ListItem>
              </SimpleLink>
            </Tooltip>
            <Tooltip title="Documents" arrow placement="right">
              <SimpleLink to="/dashboard/documents">
                <ListItem className={classes.listItem} button>
                  <ListItemIcon>
                    <LibraryBooks />
                  </ListItemIcon>
                  <ListItemText primary="Documents" />
                </ListItem>
              </SimpleLink>
            </Tooltip>
            <Tooltip title="Profile" arrow placement="right">
              <SimpleLink to='/me'>
              <ListItem className={classes.listItem} button>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Profile" />
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
