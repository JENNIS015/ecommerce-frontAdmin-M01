import { Fragment, React, useState } from "react";

import { Link } from "react-router-dom";
import { userSignOutRequest } from "../store/auth";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Box,
  Button,
  Paper,
  Tabs,
  makeStyles,
  Tab,
} from "@material-ui/core";
const useStyles = makeStyles({
  paper: {
    backgroundColor: "#fff",
    // boxShadow: theme.shadows[5],
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: "2em",
    outline: "none",
    borderRadius: "8px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "ApercuMedium",
    marginTop: "2em",
    marginBottom: "2em",
  },
  button: {
    boxShadow: "none",
  },
  root: {
    flexGrow: 1,
    zIndex: 3000,
    boxShadow: "0 10px 20px rgba(0,0,0,0.025), 0 2px 2px rgba(0,0,0,0.05)",
    borderRadius: "0px",
    padding: "2px 0px 0px 5px",
    overflow: "hidden",
    // backgroundColor: '#1a237e',
  },
  tab: {
    fontFamily: "ApercuMedium",
    textTransform: "none",
    // color: '#fff',
    color: "#525f7f",
    fontSize: "0.85rem",
  },
});
function NavBar() {
  const classes = useStyles();
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogoutOpen = () => {
    setLogoutModal(true);
  };

  const handleLogoutClose = () => {
    setLogoutModal(false);
  };

  const logout = (e) => {
    e.preventDefault();
    userSignOutRequest();
    handleLogoutClose();
    window.location.reload();
  };

  return (
    <Fragment>
      <Paper className={classes.root}>
        <Tabs
          value={window.location.pathname}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="Dashboards"
            value="/"
            component={Link}
            to="/"
            disableRipple
            className={classes.tab}
          />

          <Tab
            label="Usuarios"
            value="/users"
            component={Link}
            to="/users"
            disableRipple
            className={classes.tab}
          />
          <Tab
            label="Ordenes"
            value="/orders"
            component={Link}
            to="/orders"
            disableRipple
            className={classes.tab}
          />
          <Tab
            label="Productos"
            value="/inventory"
            component={Link}
            to="/inventory"
            disableRipple
            className={classes.tab}
          />
          <Tab
            label="Mi Cuenta"
            value="/setting"
            component={Link}
            to="/setting"
            disableRipple
            className={classes.tab}
          />
          <Tab
            label="Cerrar Sesion"
            onClick={handleLogoutOpen}
            className={classes.tab}
            //  to={handleLogoutOpen}
          />
        </Tabs>
      </Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={logoutModal}
        onClose={handleLogoutClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={logoutModal}>
          <div className={classes.paper}>
            <Typography variant="h5" className={classes.title}>
              ¿Desea cerrar sesión?
            </Typography>
            <Box
              display="flex"
              justifyContent="flex-end"
              style={{ marginTop: "2em" }}
            >
              <Button
                color="primary"
                style={{ marginRight: 10 }}
                onClick={handleLogoutClose}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={logout}
              >
                Cerrar Sesión
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
}

export default NavBar;
