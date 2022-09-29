import { React, useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import {
  makeStyles,
  TextField,
  Container,
  Typography,
  Divider,
  Box,
  IconButton,
  Button,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { updateUser } from "../store/auth";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: theme.spacing(2, 4, 3),
    borderRadius: "8px",
    minWidth: 550,
  },
  label: {
    marginTop: 8,
  },
  button: {
    boxShadow: "none",
    marginLeft: "1rem",
  },
}));

export default function FieldModal(props) {
  console.log("PO",props)
  const classes = useStyles();
  //  const [pics, setPics] = useState(props.products.foto);
  const [value, setValue] = useState(props.value);

  const onSave = (database) => {

    let dataObj = { [`${database}`]: value };

    updateUser(props.data.email, dataObj)
      .then(() =>
        props.setData({
          ...props.data,
          [`${database}`]: value,
        })
      )
      .finally(() => props.onClose());
  };
 
  const handleChange = (e) => {
    setValue(e.target.value);
  };
 
  return (
    <Container className={classes.paper}>
      <Box display="flex" justifyContent="flex-start">
        <IconButton
          aria-label="delete"
          className={classes.margin}
          onClick={props.onClose}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" className={classes.label}>
          {props.label}
        </Typography>
      </Box>
      <Divider light={true} />

      <TextField
        id="outlined-name"
        label={props.label}
        database={props.saveAs}
        className={classes.textField}
        fullWidth
        type={props.saveAs !== "password" ? "text" : "password"}
        value={value}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />

      <Box
        display="flex"
        justifyContent="flex-end"
        style={{ marginTop: "2em" }}
      >
        <Button
          className={classes.button}
          color="primary"
          onClick={props.onClose}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={() => onSave(props.saveAs)}
          className={classes.button}
          color="primary"
        >
          Actualizar
        </Button>
      </Box>
    </Container>
  );
}
