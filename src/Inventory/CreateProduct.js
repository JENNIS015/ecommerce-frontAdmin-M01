import { Fragment } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles((theme) => ({
  button: {
    boxShadow: "none",
    backgroundColor: "#000",
    color: "#fff",
  },

  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function CreateProduct(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={props.createProduct}
      >
        Crear Nuevo Producto
        <AddIcon className={classes.rightIcon}></AddIcon>
      </Button>
    </Fragment>
  );
}
