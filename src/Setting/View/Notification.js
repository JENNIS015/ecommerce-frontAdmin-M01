import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  rightIcon: {
    fontSize: "1em",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  label: {
    letterSpacing: ".07272727em",
    fontSize: ".6875rem",
    fontWeight: 500,
    lineHeight: "1rem",
    textTransform: "uppercase",
    color: "#5f6368",
    marginLeft: "10px",
  },
  row: {
 
    paddingTop: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#f5f5f5",
      cursor: "pointer",
    },
  },
  checkbox: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Notifications() {
  const classes = useStyles();

  const [state, setState] =  useState({
    "newUserRegister": false,
    "newOrden": false,
  });
 

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const NotificationsCustom = [
    {
      nombre: "Nuevo usuario",
      value: "newUserRegister",
    },
    {
      nombre: "Nuevo pedido",
      value: "newOrden",
    },
  ];
  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>

      <div>
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={1}>
            <Typography
              variant="overline"
              className={classes.label}
              gutterBottom
            >
              Habilitado
            </Typography>
          </Grid>

          <Grid item xs={1}></Grid>
        </Grid>
      </div>

      <div className={classes.row}>
        {NotificationsCustom.map((item,i) => {
          const value = item.value;
          return (
            <Grid container key={i}>
              <Grid item xs={3}>
                <Typography
                  variant="overline"
                  className={classes.label}
                  gutterBottom
                >
                  {/* Nuevo usuario */}
                  {item.nombre}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Checkbox
                  className={classes.checkbox}
                  checked={state.value}
                  onChange={handleChange( value )}
                  value={value}
                  color="primary"
                  inputProps={{
                    "aria-label": "primary checkbox",
                  }}
                />
              </Grid>
              <Grid item xs={7}></Grid>
            </Grid>
          );
        })}

        <Divider light={true} />
      </div>
    </div>
  );
}
