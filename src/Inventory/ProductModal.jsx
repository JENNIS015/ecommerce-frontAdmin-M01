import { React, useState, useEffect } from "react";
import { urlApi } from "../utils/config";
import { makeStyles } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  Container,
  Modal,
  ImageList,
  ImageListItem,
  Grid,
} from "@mui/material";
import { deletePic } from "../store/product";
import FieldRow from "../Common/FieldRow.js";
import FieldModal from "../Common/FieldModalProduct";
import UploadModal from "./../Common/UploadModal";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    minWidth: "55vw",
  },

  button: {
    boxShadow: "none",
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  image: {
    width: "5vw",
    boxShadow: "0 0 1px 0 rgba(0,0,0,.22)",
    padding: 15,
    marginBottom: theme.spacing(2),
    borderRadius: 4,
  },
  formControl: {
    minWidth: 100,
    marginTop: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  btnDelete: {
    backgroundColor: "#9d3030",
    zIndex: 1,
  },
}));

export default function ProductModal(props) {
  const classes = useStyles();

  const [fieldModal, setFieldModal] = useState({
    open: false,
    field: {
      label: null,
      value: null,
      variant: null,
    },
  });

  const handleClose = () => {
    setFieldModal({
      ...fieldModal,
      open: false,
    });
  };

  const showFieldModal = (field) => {
    setFieldModal({
      open: true,
      field,
    });
  };

  const deleteImage = (filename) => {
    let items = props.product.foto;
    let filter = items.filter((obj) => obj.filename !== filename);

    deletePic(props.product.id, { filename: filename, dataObj: filter });
    props.setProduct({
      ...props.product,
      foto: filter,
    });
  };
  useEffect(() => {}, [deletePic]);
  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        {props.product.nombre}
      </Typography>
      <>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {Array.isArray(props.product.foto)
            ? props.product.foto.map((pic) => (
                <ImageListItem key={pic.filename}>
                  <Button
                    className={classes.btnDelete}
                    onClick={() => deleteImage(pic.filename)}
                  >
                    Delete
                  </Button>
                  <img
                    alt={props.product.nombre}
                    src={`${
                      urlApi + "/uploads/" + pic.filename
                    }?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${
                      urlApi + "/uploads/" + pic.filename
                    }?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))
            : ""}
        </ImageList>
        <UploadModal
          label="Agregar Fotos"
          value={props.product.foto}
          openModal={showFieldModal}
        />
      </>

      <Box>
        <Grid container item className={classes.box} spacing={1} xs={12}>
          <Grid item xs={12} md={6}>
            <h5>Básicos</h5>

            <FieldRow
              label="Nombre"
              value={props.product.nombre}
              variant="text"
              openModal={showFieldModal}
            />
            <FieldRow
              label="Color"
              value={props.product.color}
              openModal={showFieldModal}
              variant="text"
            />
            <FieldRow
              label="Descripcion"
              value={props.product.descripcion}
              openModal={showFieldModal}
              variant="textarea"
            />
            <FieldRow
              label="Categoria"
              variant="select"
              value={props.product.categoria}
              openModal={showFieldModal}
            />

            <FieldRow
              label="Stock"
              value={props.product.stock}
              variant="number"
              openModal={showFieldModal}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <h5>Precio</h5>

            <FieldRow
              label="Precio"
              variant="number"
              value={props.product.precio}
              openModal={showFieldModal}
            />
            <FieldRow
              label="Oferta"
              variant="number"
              value={props.product.oferta}
              openModal={showFieldModal}
            />
            <FieldRow
              label="Fecha"
              variant="date"
              value={props.product.fecha}
              openModal={showFieldModal}
            />

            <h5>Medidas y Peso</h5>

            <FieldRow
              label="Largo"
              value={props.product.largo}
              openModal={showFieldModal}
              variant="number"
            />
            <FieldRow
              label="Alto"
              value={props.product.alto}
              openModal={showFieldModal}
              variant="number"
            />
            <FieldRow
              label="Profundidad"
              value={props.product.profundidad}
              openModal={showFieldModal}
              variant="number"
            />
            <FieldRow
              label="Peso"
              value={props.product.peso}
              variant="number"
              openModal={showFieldModal}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        style={{ marginTop: "2em" }}
      >
        <Button color="primary" onClick={props.onClose}>
          Guardar y Cerrar
        </Button>
      </Box>

      <Modal
        disableAutoFocus={true}
        closeAfterTransition
        open={fieldModal.open}
        onClose={handleClose}
        className={classes.modal}
      >
        <div style={{ outline: "none" }}>
          <FieldModal
            label={fieldModal.field.label}
            value={fieldModal.field.value}
            onClose={handleClose}
            setProduct={props.setProduct}
            products={props.product}
            variant={fieldModal.field.variant}
          />
        </div>
      </Modal>
    </Container>
  );
}
