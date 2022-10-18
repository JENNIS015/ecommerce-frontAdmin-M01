import { React, useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { resetPassword } from "../store/auth";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/material/styles";
import {
  Paper,
  Grid,
  Container,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import ErrorMessage from "./Error";
import { PersonOutline } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    boxShadow: "0 0 1px 0 rgba(0,0,0,.22)",
  },
  margin: {
    margin: theme.spacing(2),
  },
  title: {
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
    fontWeight: "500",
    marginBottom: theme.spacing(4),
  },
  active: {
    color: "#2196F3",
  },
  button: {
    margin: 0,
    background: "#f44336",
    display: "block",
    color: "white",
  },
}));
function ForgotPassword(props) {
  const classes = useStyles();

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
                >
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={onSubmit}
                    disabled={submit}
                  >
                    {submit ? (
                      <CircularProgress style={{ color: "#000" }} size={24} />
                    ) : (
                      <Typography>Restablecer</Typography>
                    )}
                  </Button>
                  <div style={{ width: "100%", height: 50 }}>
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
