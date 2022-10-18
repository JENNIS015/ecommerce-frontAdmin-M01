import { React, useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { connect, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { verifyToken } from "../store/auth";
import ErrorMessage from "./Error";
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
import { LockOutlined } from "@mui/icons-material";

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
  link: {
    color: "#2196F3",
    fontWeight: "800",
    marginBottom: theme.spacing(4),
  },
  password: {
    marginBottom: theme.spacing(1),
  },

  button: {
    marginTop: theme.spacing(4),
  },
}));

function ChangePassword(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [creds, setCreds] = useState({
    password: "",
    verify: "",
  });
  const [errors, setErrors] = useState({
    password: false,
    verify: false,
  });
  const [canShow, setCanShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setCanShow(false), 3000);
    return () => clearTimeout(timer);
  }, [creds]);

  const [submit, setSubmit] = useState(false);
  const [save, setSave] = useState(false);
  const onSubmit = () => {
    save === false ? setSave(true) : setSave(false);
    setSubmit(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (isEmpty(creds.password) || isEmpty(creds.verify)) {
      setSubmit(false);
    } else if (!isEmpty(creds.password) && !isEmpty(creds.verify)) {
      if (creds.password !== creds.verify) {
        setSubmit(false);
        setErrors({
          ...errors,
          verify: true,
        });
      } else {
        dispatch(verifyToken(id, creds));
        setSubmit(false);
        setCanShow(true);
      }
    }
  }, [save]);

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "50vh" }}
      >
        <Grid item sm={5}>
          <Container maxWidth="sm">
            <Paper className={classes.paper}>
              <div className={classes.margin}>
                <Typography variant="h4" className={classes.title} gutterBottom>
                  Restablece tu contraseña
                </Typography>
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
                  onChange={(e) =>
                    setCreds({ ...creds, password: e.target.value })
                  }
                  autoComplete="off"
                  disabled={submit}
                  error={errors.password}
                  fullWidth
                  required
                />
                <TextField
                  className={classes.password}
                  id="verify"
                  label="Confirmar Contraseña"
                  type="password"
                  variant="outlined"
                  value={creds.verify}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) =>
                    setCreds({ ...creds, verify: e.target.value })
                  }
                  autoComplete="off"
                  disabled={submit}
                  error={errors.verify}
                  fullWidth
                  required
                />

                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                ></Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  className={classes.button}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      boxShadow: "none",

                      marginBottom: "1rem",
                      textTransform: "none",
                    }}
                    onClick={onSubmit}
                    disabled={submit}
                  >
                    {submit ? (
                      <CircularProgress style={{ color: "#fff" }} size={24} />
                    ) : (
                      <Typography>Restablecer</Typography>
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

export default connect(mapStateToProps)(ChangePassword);
