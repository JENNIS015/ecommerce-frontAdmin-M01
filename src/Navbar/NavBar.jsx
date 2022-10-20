import { React, useState } from "react";
import { Link } from "react-router-dom";
import { userSignOutRequest } from "../store/auth";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  AppBar,
  Tooltip,
  Avatar,
  Toolbar,
  Container,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { makeStyles } from "@mui/styles";
import { url } from "./url";
const useStyles = makeStyles({
  paper: {
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: "2em",
    outline: "none",
    borderRadius: "8px",
    background: "white",
    zIndex: "1",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: "2em",
    marginBottom: "2em",
  },
  button: {
    boxShadow: "none",
  },
  root: {
    flexGrow: 1,
    borderRadius: "0px",
    padding: "2px 0px 0px 5px",
    overflow: "hidden",
    backgroundColor: "#000",
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
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#525252" }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "white",
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              MARKET BA
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {url.map((page) => (
                  <MenuItem key={page.to} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {url.map((page) => (
                <Button
                  key={page.to}
                  component={Link}
                  to={page.to}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir opciones">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key="account"
                  component={Link}
                  to={"/setting"}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Mi Cuenta</Typography>
                </MenuItem>
                <MenuItem key="closeSession" onClick={handleLogoutOpen}>
                  <Typography textAlign="center">Cerrar Sesión</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

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
    </>
  );
}

export default NavBar;
