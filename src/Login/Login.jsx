import React from "react";
import LoginCard from "./LoginCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import { userSignInRequest } from "../store/auth";

function Login(props) {
  const { userSignInRequest } = props;


  return (
    <Container style={{}}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item sm={5}>
          <LoginCard userSignInRequest={userSignInRequest} />
        </Grid>
      </Grid>
    </Container>
  );
}

Login.propTypes = {
  userSignInRequest: PropTypes.func.isRequired,
};

export default connect(null, { userSignInRequest })(Login);
