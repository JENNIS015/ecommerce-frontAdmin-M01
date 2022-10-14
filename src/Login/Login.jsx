import React from "react";
import LoginCard from "./LoginCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid, Hidden, Container   } from "@mui/material";
import { userSignInRequest } from "../store/auth";
 import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
  },
  title: {
    marginTop: theme.spacing(4),
  },
  cards: {
    height: "150px",
  },
}));

function Login(props) {
  const classes = useStyles();
  const { userSignInRequest } = props;

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={6} md={6}>
          <LoginCard userSignInRequest={userSignInRequest} />
        </Grid>
        <Grid item sm={6} md={6}>
          <Hidden xsDown>
            <img
              src="img/login_image.jpg"
              alt="inicio"
              className={classes.img}
            />
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
}

Login.propTypes = {
  userSignInRequest: PropTypes.func.isRequired,
};

export default connect(null, { userSignInRequest })(Login);
