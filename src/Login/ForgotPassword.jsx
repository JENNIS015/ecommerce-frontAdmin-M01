import { React, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import isEmpty from "lodash/isEmpty";
import { makeStyles } from "@material-ui/core/styles";
import { resetPassword } from "../store/auth";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import ErrorMessage from "./Error";
import { PersonOutline } from "@material-ui/icons";
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
  link: {
    color: "#2196F3",
    fontWeight: "800",
    marginBottom: theme.spacing(4),
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
function ForgotPassword(props) {
  console.log(props);
  const classes = useStyles();
  // Values
  const [creds, setCreds] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: false,
  });

  const [canShow, setCanShow] = useState(true);

  const [email, setemail] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [save, setSave] = useState(false);
  const onSubmit = () => {
    save === false ? setSave(true) : setSave(false);
    setSubmit(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isEmpty(creds.email)) {
      dispatch(resetPassword(creds.email)).then(
        () => (setSubmit(false), setCanShow(true))
      );
    } else {
      setSubmit(false);
      if (isEmpty(creds.email)) {
        setErrors({
          email: true,
        });
      }
    }
  }, [save]);

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
          <Container maxWidth="sm">
            <Paper className={classes.paper}>
              <div className={classes.margin}>
                <Typography variant="h4" className={classes.title} gutterBottom>
                  Restablece tu contraseña
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
                        <PersonOutline
                          className={email ? classes.active : classes.inactive}
                        />
                      </InputAdornment>
                    ),
                  }}
                  onFocus={() => setemail(true)}
                  onBlur={() => setemail(false)}
                  onChange={(e) =>
                    setCreds({ ...creds, email: e.target.value })
                  }
                  autoComplete="off"
                  disabled={submit}
                  error={errors.email}
                  fullWidth
                  autoFocus
                  required
                />

                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                ></Grid>
                <Grid
                  container
                  justifyContent="center"
                  className={classes.button}
                >
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
                      <Typography>Resetear</Typography>
                    )}
                  </Button>
                  <div style={{ width: 352, height: 50 }}>
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
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  className={classes.button}
                >
                  <Link className={classes.link} to="/">
                    Iniciar Sesión
                  </Link>
                </Grid>
              </div>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

export default connect(mapStateToProps)(ForgotPassword);
