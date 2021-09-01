import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import PropTypes from "prop-types";
import restaurantApi from "../../services/restaurantApi";
import RestaurantCard from "../../component/card/RestaurantCard";
import restaurantListBackground from "../../asset/images/restaurantListBackground.jpg";
import CircularLoading from "../../component/CircularLoading";
import Pagination from "@material-ui/lab/Pagination";
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import PaginationItem from '@material-ui/lab/PaginationItem';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import geolocationApi from "../../services/geolocationApi";
const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
    },

    paper: {
        maxWidth: 800,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    iconFilled: {
        color: "#ff6d75",
    },
    iconHover: {
        color: "#ff3d47",
    },
}));

    function sleep(delay = 0) {
      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: "Very Dissatisfied",
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: "Dissatisfied",
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: "Neutral",
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: "Satisfied",
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: "Very Satisfied",
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function RestaurantList() {
    const classes = useStyles();
    const [value] = React.useState(4);
    const [restaurantList, setRestaurantList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [options, setOptions] = React.useState([]);

    const [countryList,setCountryList] = useState([]);
    const [cityList,setCityList] = useState([]);
    const [page, setPage] =  useState(1);
    const [currentCountry,setCurrentCountry] = useState();
    const [currentCity,setCurrentCity] = useState();
    const [countryTabOpen, setCountryTabOpen] = useState(false);
    const [cityTabOpen, setCityTabOpen] = useState(false);
    const countryLoading = countryTabOpen && countryList.length === 0;
    const cityLoading = cityTabOpen && cityList.length === 0;
    useEffect(() => {
        let active = true;

        if (!countryLoading) {
        return undefined;
        }
        (async () => {
            const response = await fetch(
                "https://country.register.gov.uk/records.json?page-size=5000"
            );
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();

            if (active) {
                setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
            }
        })();
        return () => {
            active = false;
        };
    }, [countryLoading]);
        useEffect(() => {
          let active = true;

          if (!cityLoading) {
            return undefined;
          }
          (async () => {
            const response = await fetch(
              "https://country.register.gov.uk/records.json?page-size=5000"
            );
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();

            if (active) {
              setOptions(
                Object.keys(countries).map((key) => countries[key].item[0])
              );
            }
          })();
          return () => {
            active = false;
          };
        }, [cityLoading]);

    useEffect(() => {
        fetch_country_list();
        fetch_restaurant_list();
    }, []);


    useEffect(() => {
        console.log(countryList);
        fetch_city_list_baseoneCountry();
    }, [countryList]);

    useEffect(() => {
        console.log(cityList);
    }, [cityList]);

    useEffect(() => {
        console.log(currentCountry);
        fetch_city_list_baseoneCountry();
    }, [currentCountry]);
    useEffect(() => {
        console.log(currentCity);
        fetch_restaurant_list();
    }, [currentCity]);
    useEffect(() => {
          console.log(restaurantList);
    }, [restaurantList]);
    
    const renderRestaurantsList = () => {
        return (
            <Grid container spacing={3}>
                {restaurantList.map((restaurant) => (
                    <Grid item xs={12}>
                        <RestaurantCard info={restaurant} />
                    </Grid>
                ))}
            </Grid>
        );
    };
    const handleChangePaginition = (event, page) => {
   
    };
      const handlePageChanges = (_, page) => {
          console.log("done");
           console.log(page);
           setCurrentPage(page);
           fetch_restaurant_list();
      };

    const fetch_restaurant_list = async () => {
        try {
            const params = {
              skip: currentPage,
              limit: limit,
              city: currentCity?.City,
            };
            const response = await restaurantApi.getRestaurantList(params);
            setRestaurantList(response);
        } catch (e) {
            console.log(e);
        }
    };
    const fetch_city_list_baseoneCountry = async () => {
          try {
            const params = {
              countrycode: currentCountry.country_code,
            };
            const response = await geolocationApi.getCityBaseonCountrycode(params);
            setCityList(response);
          } catch (e) {
            console.log(e);
          }
        };
    const fetch_country_list = async () => {
          try {
            const response = await geolocationApi.getAllCountryCodes();
            setCountryList(response);
          } catch (e) {
            console.log(e);
          }
        };
    const get_Country_OptionSelected = (country,value) => {
        setCurrentCountry(value);
    }
    const get_city_OptionSelected=(city, value) =>{
        setCurrentCity(value);
    }
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
      <div className={classes.root}>
        <div
          style={{
            background: `url(${restaurantListBackground})`,
            backgroundRepeat: "no-repeat",
            height: "300px",
            justify: "center",
            width: "1800px",
          }}
        />
        <Button
          width="200"
          variant="contained"
          color="#424242"
          disableElevation
        >
          VIEW ON MAP
        </Button>
        {restaurantList.length > 0 ? (
          <div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Autocomplete
                  id="asynchronous-demo"
                  style={{ width: 300 }}
                  open={countryTabOpen}
                  onOpen={() => {
                    setCountryTabOpen(true);
                  }}
                  onClose={() => {
                    setCountryTabOpen(false);
                  }}
                  getOptionSelected={get_Country_OptionSelected}
                  getOptionLabel={(option) => option.country}
                  options={countryList}
                  loading={countryLoading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {countryLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="asynchronous-demo"
                  style={{ width: 300 }}
                  open={cityTabOpen}
                  onOpen={() => {
                    setCityTabOpen(true);
                  }}
                  onClose={() => {
                    setCityTabOpen(false);
                  }}
                  getOptionSelected={get_city_OptionSelected}
                  getOptionLabel={(option) => option.City}
                  options={cityList}
                  loading={cityLoading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {cityLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {renderRestaurantsList()}
            <Pagination
              count={10}
              color="primary"
              justify="center"
              page={currentPage}
              onChange={handlePageChanges}
            />
          </div>
        ) : (
          <CircularLoading />
        )}
      </div>
    );
}
