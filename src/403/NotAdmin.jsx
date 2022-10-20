import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Container } from "@mui/material";

const useStyles = makeStyles((theme) => ({

  bold: {
    fontWeight: 600,
    fontSize: "26px",
  },
  subtitle1: {
    fontWeight: 600,
  },
}));

export default function NotAdmin() {
  const classes = useStyles();

  return (
    <Container>
      <Container>
        <Typography
          variant="subtitle1"
          align="center"
          className={classes.bold}
          gutterBottom
        >
          Acceso no autorizado
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          No tienes permiso para visualizar o editar con el usuario actual.
        </Typography>
      </Container>
    </Container>
  );
}
