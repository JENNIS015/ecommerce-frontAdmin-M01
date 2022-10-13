import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";

import {
  Paper,
  makeStyles,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { LockOutlined, PersonOutline } from "@mui/icons-material";
import ErrorMessage from "./Error";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    boxShadow: "0 0 1px 0 rgba(0,0,0,.22)",
  },
  margin: {
    margin: theme.spacing(2),
  },
  title: {
    color: "#f44336",
    marginBottom: theme.spacing(6),
  },
  textfield: {
    marginBottom: theme.spacing(4),
  },
  password: {
    marginBottom: theme.spacing(1),
  },

  btn: {
    marginTop: theme.spacing(4),
    background: "#f44336",
    display: "block",
    color: "white",
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [submit, setSubmit] = useState(false);
  const [execute, setExecute] = useState(false);

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const onSubmit = () => {
    execute === false ? setExecute(true) : setExecute(false);
    setSubmit(true);
  };

  let navigate = useNavigate();
  const changePath = () => {
    let path = `password`;
    navigate(path);
  };
  useEffect(() => {
    if (!isEmpty(creds.email) && !isEmpty(creds.password)) {
      props.userSignInRequest(creds);
    } else {
      setSubmit(false);
      if (isEmpty(creds.email)) {
        setErrors({
          email: true,
        });
      }
      if (isEmpty(creds.password)) {
        setErrors({
          ...errors,
          password: true,
        });
      }
    }
  }, [execute]);

  const [canShow, setCanShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setCanShow(false), 3000);
    return () => clearTimeout(timer);
  }, [creds]);

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <div className={classes.margin}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            ¡Bienvenido de nuevo!
          </Typography>
          <TextField
            className={classes.textfield}
            id="email"
            label="Correo Electrónico"
            type="email"
            variant="outlined"
            value={creds.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            disabled={submit}
            error={errors.email}
            fullWidth
            required
          />
          <TextField
            className={classes.password}
            id="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            value={creds.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            disabled={submit}
            error={errors.password}
            fullWidth
            required
          />

          <Button
            variant="contained"
            className={classes.btn}
            onClick={onSubmit}
            disabled={submit}
          >
            {submit ? (
              <CircularProgress style={{ color: "#fff" }} size={24} />
            ) : (
              <Typography>Ingresar</Typography>
            )}
          </Button>
          <Button
            disableFocusRipple
            disableRipple
            style={{ textTransform: "none" }}
            variant="text"
            disabled={submit}
            onClick={changePath}
          >
            ¿Olvidaste la contraseña?
          </Button>
          <div style={{ width: "100%", height: "50px" }}>
            {props.errorMessage.message ? (
              canShow === true ? (
                <ErrorMessage
                  variant={props.errorMessage.variant}
                  message={props.errorMessage.message.message}
                />
              ) : (
                <> </>
              )
            ) : null}
          </div>
        </div>
      </Paper>
    </Container>
  );
};

Login.propTypes = {
  userSignInRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

export default connect(mapStateToProps)(Login);
