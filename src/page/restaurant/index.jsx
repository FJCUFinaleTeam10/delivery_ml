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
import { useParams } from "react-router-dom";
import menuApi from "../../services/menuApi";

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
  section: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function StickyHeadTable() {

  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [itemCount, setItemCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [menus, setMenus] = React.useState([]);
  const [currentSelected, setCurrentSelected] = React.useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const urlparams = useParams();
  const [currentSections,setCurrentSections] = useState(0);
  const currentRestaurantId = parseInt(JSON.parse(JSON.stringify(urlparams.id)));

  useEffect(() => {
        fetch_restaurant_baseon_id();
        fetch_order_list();
    }, []);

    useEffect(() => {
      console.log(menus[currentSections]);
    }, [currentSections]);
    useEffect(() => {
       console.log(currentRestaurant);
    }, [currentRestaurant]);

    const  handleTouchTap=(id)=>{
      console.log(id);
      setCurrentSections(id);
   }

  const fetch_restaurant_baseon_id =  async ()=>{
    const params = {
      restId: currentRestaurantId,
    };
    const response = await restaurantApi.getRestaurantBaseOnId(params);
    setCurrentRestaurant(response);
  };
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

  const fetch_order_list = async () => {
    try {
      const params = {
        skip: currentPage,
        limit: rowsPerPage,
        restId: currentRestaurantId,
      };
      const response = await restaurantApi.getMenutList(params);
      setMenus(response);
    } catch (e) {
      console.log(e);

    }
  };

  const handleOrder = async () => {
    try {
        const params = {
            longitude: currentRestaurant.Longitude,
            latitude:  currentRestaurant.Latitude,
            requestTime: formatDate(Date.now()),
            restaurantId: currentRestaurant.id,
          };
        const respone = await orderApi.createOrder(params);
        return respone;
      } catch (e) {
         console.log(e);
      
    }
  };
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
    const render_section = () => {
      return (
        <Paper>
          <List
            className={classes.section}
            subheader={<ListSubheader>Sections</ListSubheader>}
          >
            {menus.map((section, index) => (
              <ListItem
                key={section.id}
                button
                onClick={() => handleTouchTap(index)}
              >
                <ListItemAvatar>
                  <ListItemText primary={`${section.section}`} />
                </ListItemAvatar>
              </ListItem>
            ))}
          </List>
        </Paper>
      );
    };



  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs>
          {render_section()}
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
              <Typography variant="h6">{menus[currentSections]?.section}</Typography>
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
                  {menus[currentSections]?.menu.map((menu) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={menu.id}
                      >
                        <TableCell key="name">
                          {menu.item}
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
