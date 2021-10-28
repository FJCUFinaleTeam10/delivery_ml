import React, { withStyles, useEffect, useState } from "react";
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
import geolocationApi from "../../services/geolocationApi";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import orderData from './orderData.json';


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

    const [countryList, setCountryList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [page, setPage] = useState(1);
    const [currentCountry, setCurrentCountry] = useState();
    const [currentCity, setCurrentCity] = useState();
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
    const get_Country_OptionSelected = (country, value) => {
        setCurrentCountry(value);
    }
    const get_city_OptionSelected = (city, value) => {
        setCurrentCity(value);
    }
    const handleChange = (event, value) => {
        setPage(value);
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const RestaurantName = orderData.map((orderData) => {
        return (
            <Typography>
                {orderData.order_restaurant_carrier_restaurantId} <br />
            </Typography>
        )
    }
    )

    const RestaurantDate = orderData.map((orderData) => {
        return (
            <Typography>
                {orderData.order_approved_at}<br />
            </Typography>
        )
    }
    )

    const OrderDataID = orderData.map((orderData) => {
        return (
            <Typography>
                姓名: {orderData.id} <br />
                住址: ({orderData.order_customer_Latitude}, {orderData.order_customer_Longitude}) <br />
                電話: {orderData.order_coustomer_phone}
            </Typography>
        )
    }
    )

    return (
        <div>
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar variant="square" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {OrderDataID}
                                </Typography>
                            </React.Fragment>
                        }

                    />
                </ListItem>
            </List>
            <Card>
                <Typography>
                    訂單資訊
                </Typography>
            </Card>
            <Card className={classes.Information_root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={RestaurantName}
                    subheader={RestaurantDate}
                />

                <CardContent>
                    <Button variant="outlined" color="primary">
                        餐點配送狀況
                    </Button>
                </CardContent>
                <CardActions disableSpacing>
                    <Typography component="div">
                        <Box fontStyle="italic" m={1}>
                            詳細內容
                        </Box>
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            <Box fontWeight="fontWeightBold">
                                餐點內容: <br />
                            </Box>
                        </Typography>
                        <Typography paragraph>
                            soda * 1 <br />
                            coke * 1 <br />
                            burger * 2 <br />
                        </Typography>
                        <Typography>
                            Total cost: NT200
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}