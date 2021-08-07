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
import food1 from "../../asset/images/food1.jpg"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/AddCircleOutline';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

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
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
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
  }
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

  

  return (
  <div>
    <Grid container spacing={1}>
      <Grid container direction='row' justify="space-evenly" alignItems="stretch">
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
        
        <Grid item sm={6}>
          <Paper className={classes.root}>
            <CardContent   className={classes.MenuBackground} background="#33cbb7">
              <Typography className={classes.Menu} variant="h5" component="h2">
                  Menu
              </Typography>
            </CardContent>
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
                          column.id==='name'?(
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}
                              <Avatar variant="square" className={classes.square}>
                                <img src={food1} alt="Italian Trulli" />
                              </Avatar>
                            </TableCell>
                          ):(
                            column.id==='Order'?(
                              <IconButton aria-label="AddCircleOutline" className={classes.margin}>
                                <DeleteIcon fontSize="medium" />
                              </IconButton>
                            ):(
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}
                              </TableCell>
                            ))                   
                          );})}
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
        
        <Grid item style={{padding:100}}>
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
      </Grid>
    </Grid>
    
  </div>
  );
}


