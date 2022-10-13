import { React, useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
 import { makeStyles } from "@mui/styles";
import {
 
  TextField,
  Container,
  Typography,
  Divider,
  Box,
  IconButton,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { fetchCategory, updateProduct } from "../store/product";

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();
  const [pics, setPics] = useState(props.products.foto);
  const [value, setValue] = useState(props.value);

  const onSave = (label) => {
    label = label.toLowerCase();
    let dataObj = { [`${label}`]: value };
    updateProduct(props.products.id, dataObj)
      .then(() =>
        props.setProduct({
          ...props.products,
          [`${label}`]: value,
        })
      )
      .finally(() => props.onClose());
  };
  const onSavePic = () => {
    let dataObj = { fotoNueva: pics, nombre: props.products.nombre };
    updateProduct(props.products.id, dataObj)
      .then(() =>
        props.setProduct({
          ...props.products,
          nombre: dataObj.nombre,
        })
      )
      .finally(() => props.onClose());
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleChangePic = (file) => {
    setPics(file);
  };
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      try {
        let response = await fetchCategory();

        response = await response.data.categoria;

        setCategorias(response);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    props.variant === "select"
      ? fetchMyAPI()
      : document.getElementsByClassName("deleteImage");
  }, []);

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

      {props.variant === "number" ||
      props.variant === "date" ||
      props.variant === "text" ? (
        <TextField
          id="outlined-name"
          label={props.label}
          className={classes.textField}
          fullWidth
          value={value}
          type={
            props.variant === "number"
              ? "number"
              : props.variant === "date"
              ? "date"
              : "text"
          }
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
      ) : props.variant === "textarea" ? (
        <TextField
          id="outlined-name"
          label={props.label}
          className={classes.textField}
          fullWidth
          multiline
          minRows="4"
          value={value}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
      ) : props.variant === "select" ? (
        <Select
          onChange={handleChange}
          value={value}
          labelWidth={0}
          inputProps={{
            name: "category",
            id: "outlined-category-simple",
          }}
          required
        >
          {categorias.map((item) => (
            <MenuItem key={item._id} value={item.nombre}>
              {item.nombre}
            </MenuItem>
          ))}
        </Select>
      ) : props.variant === "pic" ? (
        <ImageUploader
          withIcon={false}
          withPreview={true}
          className={classes.image}
          buttonText="Sube imagenes"
          onChange={handleChangePic}
          imgExtension={[".jpg", ".gif", ".png"]}
          maxFileSize={5242880}
          fileSizeError="El archivo es muy grande"
          label="Limite imagen 5mb. Formato jpg,gif, png"
        />
      ) : (
        ""
      )}

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
        {props.variant !== "pic" ? (
          <Button
            variant="contained"
            onClick={() => onSave(props.label)}
            className={classes.button}
            color="primary"
          >
            Actualizar
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onSavePic}
            className={classes.button}
            color="primary"
          >
            Agregar Foto
          </Button>
        )}
      </Box>
    </Container>
  );
}
