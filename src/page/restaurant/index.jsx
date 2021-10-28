import React, { useEffect, useState ,useMemo,useRef,createRef} from "react";
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
import { useParams } from "react-router-dom";
import menuApi from "../../services/menuApi";
import Modal from "@material-ui/core/Modal";
import Map from "../../component/Map";
const columns = [
  { id: "name", label: "name", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "des", label: "Description", minWidth: 100 },
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
    margin: theme.spacing(1),

  },
  map: {
    height: `25vh`,
    width: `25vh`,
  },
  modal: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 5, 5),
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
    marginRight: "100px",
    maxWidth: 159,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
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
  const [totalPrice,setTotalPrice] = useState(0.0);
  const [openOrdeModal, setOpenOrderModal] = useState(false);
  const [currentPosition, setCurrentPosition] = useState([2.3522219, 48.856614,
]);
  const [zoom,setZoom] = useState(10);
  const [draggable, setDraggable] = useState(true);
  const [firstName,setFirstName] = useState(null);
  const [lastName,setLastName] = useState(null);
  const [telephone,setTelephone] = useState(null);
  const [description,setDescription] = useState(null);
  const [email,setEmail] = useState(null);
  
    let mapRef = createRef();
  useEffect(() => {
        fetch_restaurant_baseon_id();
        fetch_order_list();
    }, []);

    useEffect(() => {
      setCurrentPosition([parseFloat(currentRestaurant?.Latitude),parseFloat(currentRestaurant?.Longitude),
        
      ]);
      console.log(currentRestaurant);
    }, [currentRestaurant]);

    useEffect(() => {
      caculate();
    }, [currentSelected]);

        useEffect(() => {
          console.log("hit");
          console.log(currentPosition);
        }, [currentPosition]);

    const  handleTouchTap=(id)=>{
      console.log(id);
      setCurrentSections(id);
   }
    
    function handleOpen(){
       setOpenOrderModal(true);
    };
    function handleClose(){
       setOpenOrderModal(false);
    };
  const fetch_restaurant_baseon_id =  async ()=>{
    const params = {
      restId: currentRestaurantId,
    };
    const response = await restaurantApi.getRestaurantBaseOnId(params);
    setCurrentRestaurant(response[0]);
  };
  const handleAddItem = (currentItem) => {
    let foundIndex =  [...currentSelected].map(e=>e.info.item).indexOf(currentItem.item);
    if (foundIndex <0) {
      setCurrentSelected(currentSelected => [...currentSelected,{ info: currentItem, amount: 1 }]);
    }
    else{
      let cloneArray = [...currentSelected];
      cloneArray[foundIndex].amount++;
      setCurrentSelected(cloneArray);
    }
  };

  const handleDeleteItem = (currentItem) => {
     let foundIndex =  [...currentSelected].map(e=>e.info.item).indexOf(currentItem.item);
     if(foundIndex>=0){
             if (currentSelected[foundIndex] === 0) {
               let cloneArray = [...currentSelected];
               setCurrentSelected(cloneArray.splice(currentItem, 1));
             } else {
               let cloneArray = [...currentSelected];
               cloneArray[foundIndex].amount--;
               setCurrentSelected(cloneArray);
             }
     }
  };
  const handleChangePage = (event, newPage) => {};

  const handleChangeRowsPerPage = (event) => {setRowsPerPage(+event.target.value);};



  const fetch_order_list = async () => {
    
    try {
      const params = {
        skip: currentPage,
        limit: rowsPerPage,
        restId: currentRestaurantId,
        firstName:firstName,
        lastName:lastName,
        
      };
      const response = await restaurantApi.getMenutList(params);
      setMenus(response);
    } catch (e) {
      console.log(e);

    }
  };

  const handleOrder = async () => {
    setOpenOrderModal(false);
    try {
        const params = {
          longitude: currentPosition[1],
          latitude: currentRestaurant[0],
          requestTime: formatDate(Date.now()),
          restaurantId: currentRestaurant.Restaurant_ID,
          totalPrice: totalPrice,
          firstName: firstName,
          lastName: lastName,
          email: email,
          description: description,
          telephone: telephone,
        };
        const respone = await orderApi.createOrder(params);
        return respone;
      } catch (e) {
         console.log(e);
    }
  };
  const caculate =async() => {
    const reducer = (accumulator, currentValue) =>accumulator +parseFloat(currentValue.info.price.replace("$", "")) *currentValue.amount;
    const result = currentSelected.reduce(reducer, 0.0);
    setTotalPrice(result);
  }

  const renderModal = (
    <Paper className={classes.modal}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="First Name"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Last Name"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Telephone/mobile"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={5}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Latitude"
              variant="outlined"
              value={currentPosition[0]}
            />
          </form>
        </Grid>
        <Grid item xs={5}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Longitude"
              variant="outlined"
              value={currentPosition[1]}
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <Map
            text={{
              features: [{ geometry: { coordinates: currentPosition } }],
              query: "new location",
            }}
            currentPosition={currentPosition}
            setCurrentPosition={setCurrentPosition}
          />
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Email"
              variant="outlined"
              value={email}
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="outlined-multiline-static"
              multiline
              label="Description"
              variant="outlined"
              rows={5}
            />
          </form>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={handleOrder}>
              Confirm
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
  const render_shopping_cart = () => {
      return (
        <List className={classes.OrderCart} subheader={<li />}>
          {currentSelected.map((item) => (
            <ListItem key={`item-${item}`}>
              <ListItemAvatar>
                <Avatar variant="square" className={classes.square}>
                  <img src={item.info.img} alt="Italian Trulli" />
                </Avatar>
                <ListItemText primary={`${item.info.item}`} />
              </ListItemAvatar>
              <ListItemText primary={`${item.amount}`} />
              <Divider />
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
              <Typography variant="h6">
                {menus[currentSections]?.section}
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

                          <Avatar variant="square" className={classes.square}>
                            <img src={menu.img} alt="Italian Trulli"  width="5000" height="500"/>
                          </Avatar>
                          {menu.item}
                        </TableCell>
                        <TableCell key="price">{menu.price}</TableCell>
                        <TableCell key="des">{menu.description}</TableCell>
                        <TableCell align="right">
                          <ButtonGroup>
                            <Button
                              onClick={() => {handleDeleteItem(menu);}}
                            >
                              <RemoveIcon fontSize="small" />
                            </Button>
                            <Button
                              onClick={() => {handleAddItem(menu);}}
                            >
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
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h4" component="h2" gutterBottom>
                      {`Price:${totalPrice}$`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpen}
                    >
                      Order Now
                    </Button>
                    <Modal
                      open={openOrdeModal}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {renderModal}
                    </Modal>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </paper>
        </Grid>
      </Grid>
    </div>
  );
}
