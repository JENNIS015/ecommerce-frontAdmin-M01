import React from "react";
import {   Box, Typography } from "@mui/material";
 import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  title: {
    marginTop: 4,
    marginLeft: 4,
    background: "#efefef",
    width: " 100%",
    padding: " 20px",
  },
}));

export default function PageTitle(props) {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      className={classes.container}
    >
      <Typography variant="h6" className={classes.title} gutterBottom>
        {props.title}
      </Typography>
    </Box>
  );
}
