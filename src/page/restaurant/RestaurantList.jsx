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
    const array = [1, 2, 3, 4, 5];
    const [currentPage, setCurrentPage] = useState(0);
    const [limit, setLimit] = useState(5);
    useEffect(() => {
        setInterval(() => {
            fetch_restaurant_list();
        }, 5000); // 5s
    }, []);
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
    const handle = (pageNumber) => {
        setCurrentPage(pageNumber)
        fetch_restaurant_list()
    }

    const fetch_restaurant_list = async () => {
        try {
            const params = {
                skip: currentPage,
                limit: limit,
            };
            // console.log(params);
            const response = await restaurantApi.getRestaurantList(params);
            setRestaurantList(response);
        } catch (e) {
            console.log(e);
        }
    };
    const [page, setPage] = React.useState(1);

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
                    postition: "center",
                    width: "1800px",
                }}
            />
            <Button width="200" variant="contained" color="#424242" disableElevation>
                VIEW ON MAP
            </Button>
            {restaurantList.length > 0 ? (
                renderRestaurantsList()
            ) : (
                <CircularLoading />
            )}

            <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
                <Route>
                    {({ location }) => {
                        const query = new URLSearchParams(location.search);
                        const page = parseInt(query.get('page') || '1', 10);
                        return (
                            <Pagination
                                page={page}
                                count={10}
                                onchange={handle}
                                renderItem={(item) => (
                                    <PaginationItem
                                        component={Link}
                                        to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
                                        {...item}
                                    />
                                )}
                            />
                        );
                    }}
                </Route>
            </MemoryRouter>


            
        </div>



    );
}
