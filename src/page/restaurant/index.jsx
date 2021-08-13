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
import food1 from "../../asset/images/food1.jpg"
import restaurant1_background1 from "../../asset/images/restaurant1_background1.jpg"
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RestaurantList from "./restaurantList";
import { Link } from "react-router-dom";


const columns = [
  { id: 'name', label: 'Item', minWidth: 170 },
  { id: 'code', label: 'Price', minWidth: 100 },
  {
    id: 'Order',
    label: 'Order',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'NT$150', 1324171354, 3287263),
  createData('China', 'NT$150', 1403500365, 9596961),
  createData('Italy', 'NT$150', 60483973, 301340),
  createData('United States', 'NT$150', 327167434, 9833520),
  createData('Canada', 'NT$150', 37602103, 9984670),
  createData('Australia', 'NT$150', 25475400, 7692024),
  createData('Germany', 'NT$150', 83019200, 357578),
  createData('Ireland', 'NT$150', 4857000, 70273),
  createData('Mexico', 'NT$150', 126577691, 1972550),
  createData('Japan', 'NT$150', 126317000, 377973),
  createData('France', 'NT$150', 67022000, 640679),
  createData('United Kingdom', 'NT$150', 67545757, 242495),
  createData('Russia', 'NT$150', 146793744, 17098246),
  createData('Nigeria', 'NT$150', 200962417, 923768),
  createData('Brazil', 'NT$150', 210147125, 8515767),
];


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
    background: '#82cac3',
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }



  return (
    // 左邊按鈕、中間menu部分、右邊shopping cart
    <div>
      <div style={{
        background: `url(${restaurant1_background1})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
        height: '300px', postition: 'center', width: '1000px', Aligh:'center'}} />
      <Grid container spacing={3}>
        <Grid item xs>
          
          <Button component={Link} to="/restaurantList" variant="contained" color="primary" disableElevation>
            BACK TO SEARCH
          </Button>
          <Grid item xs>
            <List component="nav" className={classes.BackToMenuItem} aria-label="contacts">
              <Divider light />

              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab label="Starters" {...a11yProps(0)} />
                <Tab label="Main Courses" {...a11yProps(1)} />
                <Tab label="Beef" {...a11yProps(2)} />
                <Tab label="Desserts" {...a11yProps(3)} />
                <Tab label="Drinks" {...a11yProps(4)} />
              </Tabs>

            </List>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.MenuBackground}>

            <Box p={1}>
              <Typography align="center" variant="h4" style={{ fontWeight: 600 }}>
                Menu
              </Typography>
            </Box>

          </Paper>
          <Paper>
            <TabPanel value={value} index={0}>
              <Grid>
                <Box p={1}>
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
                              return (
                                column.id === 'name' ? (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}

                                    <Avatar variant="square" className={classes.square}>
                                      <img width="50px" src={food1} alt="Italian Trulli" />
                                    </Avatar>
                                  </TableCell>
                                ) : (
                                  column.id === 'Order' ? (
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

                                  ) : (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}
                                    </TableCell>
                                  ))
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
              </Grid>
            </TabPanel>
          </Paper>

          <Paper>

            <TabPanel value={value} index={1}>
              <Grid>
                <Box p={1}>
                  <Typography variant="h6">MAIN COURSES</Typography>
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
                              return (
                                column.id === 'name' ? (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}
                                    <Avatar variant="square" className={classes.square}>
                                      <img src={food1} alt="Italian Trulli" />
                                    </Avatar>
                                  </TableCell>
                                ) : (
                                  column.id === 'Order' ? (
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

                                  ) : (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}
                                    </TableCell>
                                  ))
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
              </Grid>
            </TabPanel>
            <Paper>

              <TabPanel value={value} index={2}>
                <Grid>
                  <Box p={1}>
                    <Typography variant="h6">BEEF</Typography>
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
                                return (
                                  column.id === 'name' ? (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}

                                      <Avatar variant="square" className={classes.square}>
                                        <img width="50px" src={food1} alt="Italian Trulli" />
                                      </Avatar>
                                    </TableCell>
                                  ) : (
                                    column.id === 'Order' ? (
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

                                    ) : (
                                      <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}
                                      </TableCell>
                                    ))
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
                </Grid>
              </TabPanel>
            </Paper>


            <Paper>
              <TabPanel value={value} index={3}>
                <Grid>
                  <Box p={1}>
                    <Typography variant="h6">DESSERTS</Typography>
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
                                return (
                                  column.id === 'name' ? (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}

                                      <Avatar variant="square" className={classes.square}>
                                        <img width="50px" src={food1} alt="Italian Trulli" />
                                      </Avatar>
                                    </TableCell>
                                  ) : (
                                    column.id === 'Order' ? (
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

                                    ) : (
                                      <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}
                                      </TableCell>
                                    ))
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
                </Grid>
              </TabPanel>
            </Paper>

            <TabPanel value={value} index={4}>
              <Grid>
                <Box p={1}>
                  <Typography variant="h6">DRINKS</Typography>
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
                              return (
                                column.id === 'name' ? (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}

                                    <Avatar variant="square" className={classes.square}>
                                      <img width="50px" src={food1} alt="Italian Trulli" />
                                    </Avatar>
                                  </TableCell>
                                ) : (
                                  column.id === 'Order' ? (
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

                                  ) : (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}
                                    </TableCell>
                                  ))
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
              </Grid>
            </TabPanel>
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
                  <div>
                    <Badge color="secondary" badgeContent={itemCount}>
                      <ShoppingCartIcon />{" "}
                    </Badge>

                  </div>
                </div>

              </CardContent>

            </Card>
          </paper>
        </Grid>
      </Grid>

    </div>
  );
}


