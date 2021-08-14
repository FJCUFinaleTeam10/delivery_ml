import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2),
  },
  progressContainer: {
    position: "absolute",
    top: "60%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function RestaurantCard(props) {
  const classes = useStyles();
  return (
    <Paper>
      <div class="col-md-9 col-sm-9">
        <div class="desc">
          <div class="thumb_strip">
            <img src="img/thumb_restaurant_2.jpg" alt="" />
          </div>
          <div class="rating">
            <i class="icon_star voted"></i>
            <i class="icon_star voted"></i>
            <i class="icon_star voted"></i>
            <i class="icon_star voted"></i>
            <i class="icon_star"></i> (
            <small>
              <a href="#0">98 reviews</a>
            </small>
            )
          </div>
          <h3>Naples Pizza</h3>
          <div class="type">Italian / Pizza</div>
          <div class="location">
            135 Newtownards Road, Belfast, BT4.{" "}
            <span class="opening">Opens at 17:00.</span> Minimum order: $15
          </div>
          <ul>
            <li>
              Take away<i class="icon_check_alt2 ok"></i>
            </li>
            <li>
              Delivery<i class="icon_check_alt2 ok"></i>
            </li>
          </ul>
        </div>
      </div>
    </Paper>
  );
}
