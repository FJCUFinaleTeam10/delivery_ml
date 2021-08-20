import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import restaurantApi from "../../services/restaurantApi";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import orderApi from "../../services/orderApi";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const columns = [
  { id: "name", label: "name", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 100 },
  {
    id: "Order",
    label: "Order",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

  const formatDate = (originDateTime) => {
    let year = new Intl.DateTimeFormat("en", {
      year: "numeric",
      hour12: false,
    }).format(originDateTime);
    let month = new Intl.DateTimeFormat("en", {
      month: "numeric",
      hour12: false,
    }).format(originDateTime);
    let day = new Intl.DateTimeFormat("en", {
      day: "numeric",
      hour12: false,
    }).format(originDateTime);
    let hour = new Intl.DateTimeFormat("en", {
      hour: "numeric",
      hour12: false,
    }).format(originDateTime);
    let minute = new Intl.DateTimeFormat("en", {
      minute: "numeric",
      hour12: false,
    }).format(originDateTime);
    let second = new Intl.DateTimeFormat("en", {
      second: "numeric",
      hour12: false,
    }).format(originDateTime);

    return `${day <= 9 ? "0" + day : day}-${
      month <= 9 ? "0" + month : month
    }-${year} ${hour <= 9 ? hour : hour}:${
      minute <= 9 ? "0" + minute : minute
    }:${second <= 9 ? "0" + second : second}`;
  };


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  MenuRoot: {
    marginLeft: "0px",
  },
  container: {
    maxHeight: 440,
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  margin: {
    marginLeft: "300px",
  },
  MenuBackground: {
    background: "#33cbb7",
  },
  Menu: {
    fontWeight: "bolder",
  },
  BackToMenuItem: {
    width: "100%",
    maxWidth: 159,
    backgroundColor: theme.palette.background.paper,
  },
  OrderCart: {
    width: "50%",
    marginRight: "100px",
    maxWidth: 159,
    backgroundColor: theme.palette.background.paper,
  },
  Order_root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(30),
      height: theme.spacing(80),
    },
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
}));


export default function StickyHeadTable() {

  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [itemCount, setItemCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [menus, setMenus] = React.useState([]);
  const [currentSelected, setCurrentSelected] = React.useState([]);
  const [restaurantList,setRestaurantList] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
   const [snackPack, setSnackPack] = React.useState([]);
   const [open, setOpen] = React.useState(true);
   const [messageInfo, setMessageInfo] = React.useState(undefined);

  const handleAddItem = (item) => {
    const index = currentSelected.findIndex((x) => x.info.id === item.id);
    console.log(index);
    if (index <0) {
      currentSelected.push({info:item,amount:0});
    }
    else{
      currentSelected[index].amount++;
    }
  };
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };

    const handleExited = () => {
      setMessageInfo(undefined);
    };

  const handleDeleteItem = (item) => {
     const index = currentSelected.findIndex((x) => x.info.id === item.id);
     console.log(index);
     if (index === 0) {
             currentSelected.splice(index, 1); 
     } else {
       currentSelected[index].amount--;
     }
     console.log(currentSelected[index]);
  };

  const handleChangePage = (event, newPage) => {
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);

  };
  useEffect(() => {
    setInterval(() => {
      fetch_restaurant_list();
      fetch_order_list();
    }, 5000); // 5s
  }, []);
  useEffect(() => {
     if (snackPack.length && !messageInfo) {
       // Set a new snack when we don't have an active one
       setMessageInfo({ ...snackPack[0] });
       setSnackPack((prev) => prev.slice(1));
       setOpen(true);
     } else if (snackPack.length && messageInfo && open) {
       // Close an active snack when a new one is added
       setOpen(false);
     }
   }, [snackPack, messageInfo, open]);

  const fetch_order_list = async () => {
    try {
      const params = {
        skip: currentPage,
        limit: rowsPerPage,
      };
      const response = await restaurantApi.getRestaurantList(params);
      setRestaurantList(response);
      handleClick("Success");
    } catch (e) {
      console.log(e);
      handleClick(String(e));
    }
  };

  const fetch_restaurant_list = async () => {
      try {
        const params = {
          skip: currentPage,
          limit: rowsPerPage,
        };
        const response = await restaurantApi.getMenutList(params);
        setMenus(response);

      } catch (e) {
        console.log(e);
      }
  };
  const handleClick = (message) => () => {
      setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleOrder = async () => {
    try {
      console.log(process.env);
        const params = {
            longitude: restaurantList[currentRestaurant].Longitude,
            latitude: restaurantList[currentRestaurant].Latitude,
            requestTime: formatDate(Date.now()),
            restaurantId: restaurantList[currentRestaurant].id,
          };
        console.log(params);
        const respone = await orderApi.createOrder(params);
      handleClick("success");
        return respone;

      } catch (e) {
         console.log(e);
         handleClick(e.message);
    }
  };
  const handleMenuRestaurantChange = (event) => {
         setCurrentRestaurant(event.target.value);
  }
  const render_shopping_cart = () => {
      return (
        <List className={classes.list} subheader={<li />}>
          {currentSelected.map((item) => (
            <ListItem key={`item-${item}`}>
              <ListItemAvatar>
                <Avatar variant="square" className={classes.square}>
                  <img src={item.info.img} alt="Italian Trulli" />
                </Avatar>
                <ListItemText primary={`${item.info.name}`} />
              </ListItemAvatar>
            </ListItem>
          ))}
        </List>
      );
  }
    const renderRestaurantsList=() => {
      return (
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-select-currency"
            select
            label="Restaurant"
            value={currentRestaurant}
            onChange={handleMenuRestaurantChange}
            helperText="Please select your Restaurant"
          >
            {restaurantList.map((restaurant, index) => (
              <MenuItem key={restaurant.id} value={index}>
                {restaurant.Restaurant_Name}
              </MenuItem>
            ))}
          </TextField>
        </form>
      );
    }


  return (
    <div>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
      />
      <Grid container spacing={3}>
        <Grid item xs>
          {renderRestaurantsList()}
          <List
            component="nav"
            className={classes.BackToMenuItem}
            aria-label="contacts"
          >
            <ListItem button>
              <ListItemText primary="Starters" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Main Courses" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Beef" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Desserts" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Drinks" />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={6}>
          <Paper>
            <CardContent
              className={classes.MenuBackground}
              background="#33cbb7"
            >
              <Typography className={classes.Menu} variant="h5" component="h2">
                Menu
              </Typography>
            </CardContent>
            <Box p={2}>
              <Typography variant="h6">STARTERS</Typography>
              <Typography variant="subtitle2">
                Te ferri iisque aliquando pro, posse nonumes efficiantur in cum.
                Sensibus reprimique eu pro. Fuisset mentitum deleniti sit ea.
              </Typography>
              <Divider light />
            </Box>

            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menus.map((menu) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={menu.id}
                      >
                        <TableCell key="name">
                          {menu.name}
                          {menu.dsc}
                          <Avatar variant="square" className={classes.square}>
                            <img src={menu.img} alt="Italian Trulli" />
                          </Avatar>
                        </TableCell>
                        <TableCell key="price">{menu.price}</TableCell>
                        <TableCell align="right">
                          <ButtonGroup>
                            <Button
                              onClick={() => {
                                handleDeleteItem(menu);
                              }}
                            >
                              {" "}
                              <RemoveIcon fontSize="small" />
                            </Button>
                            <Button
                              onClick={() => {
                                handleAddItem(menu);
                              }}
                            >
                              {" "}
                              <AddIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={menus.length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>

        <Grid item xs>
          <paper className={classes.Order_root} variant="outlined">
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <Typography gutterBottom variant="h6">
                      Your Order
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Badge color="secondary" badgeContent={itemCount}>
                      <ShoppingCartIcon />{" "}
                    </Badge>
                  </Grid>
                </Grid>
                {render_shopping_cart()}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOrder}
                >
                  Order Now
                </Button>
              </CardActions>
            </Card>
          </paper>
        </Grid>
      </Grid>
    </div>
  );
}
