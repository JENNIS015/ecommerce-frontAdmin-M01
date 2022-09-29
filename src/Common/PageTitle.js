import React from "react";
import { useNavigate } from "react-router-dom";

import { makeStyles, Box, IconButton, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  title: {
    color: "#525f7f",
    marginTop: 4,
    marginLeft: 4,
  },
}));

export default function PageTitle(props) {
  const classes = useStyles();
  //const useNavigate = useNavigate();

//   const changeRoute = () => {
//     const route = props.route ? props.route : "/dashboard/home";
//     useNavigate.push(route);

//     // Temporary workaround to allow another function to be passed via onClick prop
//     if (props.onClick !== undefined) {
//       props.onClick.call(this);
//     }
//   };

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      {/* <IconButton aria-label="delete" onClick={changeRoute}>
        <ArrowBack />
      </IconButton> */}
      <Typography variant="h6" className={classes.title} gutterBottom>
        {props.title}
      </Typography>
    </Box>
  );
}
