import React from "react";

import { Box, Typography, Container, makeStyles } from "@mui/material";
import Construction from "../Common/img/construction.png";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 600,
  },
  bold: {
    fontFamily: "ApercuBold",
  },
}));

export default function EmptyInventory() {
  const classes = useStyles();

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <img className={classes.image} src={Construction} />
      </Box>
      <Container>
        <Typography
          variant="subtitle1"
          align="center"
          className={classes.bold}
          gutterBottom
        >
          No hay productos
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Crea un nuevo producto para subir a tu sitio.
        </Typography>
      </Container>
    </Container>
  );
}
