import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import { LockOutlined, PersonOutline } from "@material-ui/icons";
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
    fontFamily: "ApercuMedium",
    marginBottom: theme.spacing(6),
    paddingTop: "20vh",
  },
  textfield: {
    marginBottom: theme.spacing(4),
  },
  password: {
    marginBottom: theme.spacing(1),
  },
  inactive: {
    color: "#757575",
  },
  active: {
    color: "#2196F3",
  },
  button: {
    marginTop: theme.spacing(4),
  },
  formControlLabel: {
    fontSize: "0.875rem",
  },
  logo: {
    width: "128px",
    userSelect: "none",
    pointerEvents: "none",
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [email, setemail] = useState(false);
  const [password, setPassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [execute, setExecute] = useState(false);
  // Values
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
            // onFocus={() => setemail(true)}
            // onBlur={() => setemail(false)}
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            autoComplete="off"
            disabled={submit}
            error={errors.email}
            fullWidth
            autoFocus
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
            // onFocus={() => setPassword(true)}
            // onBlur={() => setPassword(false)}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            autoComplete="off"
            disabled={submit}
            error={errors.password}
            fullWidth
            required
          />
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Button
                disableFocusRipple
                disableRipple
                style={{ textTransform: "none" }}
                variant="text"
                color="primary"
                disabled={submit}
                onClick={changePath}
              >
                ¿Olvidaste la contraseña?
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              style={{
                boxShadow: "none",
                width: 100,
                marginBottom: "1rem",
                textTransform: "none",
              }}
              onClick={onSubmit}
              disabled={submit}
            >
              {submit ? (
                <CircularProgress style={{ color: "#fff" }} size={24} />
              ) : (
                <Typography>Ingresar</Typography>
              )}
            </Button>
            <div style={{ width: 352, height: 112 }}>
              {props.errorMessage.message ? (
                canShow===true ? (
                  <ErrorMessage
                    variant={props.errorMessage.variant}
                    message={props.errorMessage.message.message}
                  />
                ) : (
                  <> </>
                )
              ) : null}
            </div>
          </Grid>
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
