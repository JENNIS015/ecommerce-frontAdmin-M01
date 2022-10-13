import React from "react";
import Grid from "@mui/material/Grid";
 import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(4),
  },
}));

export default function Loading(props) {
  const classes = useStyles();

  if (props.visible) {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="container"
      >
        <Grid item>
          <CircularProgress className={classes.progress} />
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
}
