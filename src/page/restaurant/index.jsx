import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import food from "../../asset/images/food.png"
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";



const columns = [
  { id: 'item', label: 'Item', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 100 },
  {
    id: 'Order',
    label: 'Order',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(item, price) {
  return { item, price};
}

const rows = [
  createData('India', 'NT$150'),
  createData('China', 'NT$150'),
  createData('Italy', 'NT$150'),
  createData('United States'),
  createData('Canada', 'NT$150'),
  createData('Australia', 'NT$150'),
  createData('Germany', 'NT$150'),
  createData('Ireland', 'NT$150'),
  createData('Mexico', 'NT$150'),
  createData('Japan', 'NT$150'),
  createData('France', 'NT$150'),
  createData('United Kingdom', 'NT$150'),
  createData('Russia', 'NT$150'),
  createData('Nigeria', 'NT$150'),
  createData('Brazil', 'NT$150'),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  MenuRoot: {
    marginLeft: '0px',
  },
  container: {
    maxHeight: 440,
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  margin: {
    marginLeft: '300px',
  },
  MenuBackground: {
    background: '#33cbb7',
  },
  Menu: {
    fontWeight: "bolder",
  },
  BackToMenuItem: {
    width: '100%',
    maxWidth: 159,
    backgroundColor: theme.palette.background.paper,
  },
  OrderCart: {
    width: '50%',
    marginRight: '100px',
    maxWidth: 159,
    backgroundColor: theme.palette.background.paper,
  },
  Order_root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(30),
      height: theme.spacing(80),
    },
  },

}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [itemCount, setItemCount] = React.useState(1);


  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs>
          <Button variant="contained" color="primary" disableElevation>
            BACK TO SEARCH
          </Button>

          <List component="nav" className={classes.BackToMenuItem} aria-label="contacts">
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
            <CardContent className={classes.MenuBackground} background="#33cbb7">
              <Typography className={classes.Menu} variant="h5" component="h2">
                Menu
              </Typography>
            </CardContent>
            <Box p={2}>
              <Typography variant="h6">STARTERS</Typography>
              <Typography variant="subtitle2">Te ferri iisque aliquando pro, posse nonumes efficiantur in cum. Sensibus reprimique eu pro. Fuisset mentitum deleniti sit ea.
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
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          return column.id === "item" ? (
                            <TableCell key={column.id} align={column.align}>
                              {column.format &&
                              typeof row[column.id] === "number"
                                ? column.format(row[column.id])
                                : row[column.id]}
                              <Avatar
                                variant="square"
                                className={classes.square}
                              >
                                <img src={food} alt="Italian Trulli" />
                              </Avatar>
                            </TableCell>
                          ) : column.id === "Order" ? (
                            <TableCell align={column.align}>
                              <ButtonGroup>
                                <Button
                                  onClick={() => {
                                    setItemCount(Math.max(itemCount - 1, 0));
                                  }}
                                >
                                  {" "}
                                  <RemoveIcon fontSize="small" />
                                </Button>
                                <Button
                                  onClick={() => {
                                    setItemCount(itemCount + 1);
                                  }}
                                >
                                  {" "}
                                  <AddIcon fontSize="small" />
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          ) : (
                            <TableCell key={column.id} align={column.align}>
                              {column.format &&
                              typeof row[column.id] === "number"
                                ? column.format(row[column.id])
                                : row[column.id]}
                            </TableCell>
                          );
                        })}

                      </TableRow>


                    );

                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>

        <Grid item xs>
          <paper className={classes.Order_root} variant="outlined">
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Your Order
                </Typography>
                <div style={{ display: "block", padding: 30 }}>
                  <h4>How to create ShoppingCart Button in ReactJS?</h4>
                  <div>
                    <Badge color="secondary" badgeContent={itemCount}>
                      <ShoppingCartIcon />{" "}
                    </Badge>

                  </div>
                </div>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </paper>
        </Grid>
      </Grid>

    </div>
  );
}


