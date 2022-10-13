import React from "react";
import clsx from "clsx";
import { Grid, Typography, Divider, Box } from "@mui/material";
 import { makeStyles } from "@mui/styles";
import Edit from "@mui/icons-material/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  label: {
    letterSpacing: ".07272727em",
    fontSize: ".6875rem",
    fontWeight: 500,
    lineHeight: "1rem",
    textTransform: "uppercase",
    color: "#5f6368",
    marginLeft: "10px",
  },
  hover: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
      cursor: "pointer",
    },
  },
  row: {
    paddingTop: theme.spacing(1),
  },
  icon: {
    color: "#5f6368",
  },
}));

const FieldRow = (props) => {
  const classes = useStyles();

  const handleClick = () => {
    if (props.openModal) {
      props.openModal({
        label: props.label,
        value: props.value,
        variant: props.variant,
        database: props.database,
      });
    }
  };

  return (
    <div className={clsx([classes.row, props.openModal && classes.hover])}>
      <Grid container onClick={handleClick}>
        <Grid item xs={5}>
          <Typography variant="overline" className={classes.label}>
            {props.label}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="subtitle">
            {" "}
            {props.database !== "password" ? props.value : "**********"}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Box display="flex" justifyContent="center">
            {props.openModal ? <Edit className={classes.icon} /> : null}
          </Box>
        </Grid>
      </Grid>
      <Divider light={true} />
    </div>
  );
};

export default FieldRow;
