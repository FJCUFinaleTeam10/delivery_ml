import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import restaurant1 from "../../asset/images/restaurant1.jpg";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import restaurantApi from "../../services/restaurantApi";
import RestaurantCard from "../../component/card/RestaurantCard";
import restaurantListBackground from "../../asset/images/restaurantListBackground.jpg"


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 900,
        minHeight: 100,
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
    const [restaurantList, setRestaurantList] = useState();
    const array = [1, 2, 3, 4, 5];

    useEffect(() => {
        setInterval(() => {
            setRestaurantList(array);
        }, 5000); // 5s
    }, []);
    const renderRestaurantsList = () => {
        console.log(array);
        return array.map((restaurant) => (
            <RestaurantCard />
        ));
    }
    return (
        <div className={classes.root}>
            <div style={{
                background: `url(${restaurantListBackground})`, backgroundRepeat: 'no-repeat',
                height: '300px', postition: 'center', width: '1800px'
            }} />
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Button
                        width="200"
                        variant="contained"
                        color="#424242"
                        disableElevation
                    >
                        VIEW ON MAP
                    </Button>
                </Grid>

            </Grid>
            {/* <RestaurantCard/> */}
            {renderRestaurantsList()}
        </div>
    );
}
