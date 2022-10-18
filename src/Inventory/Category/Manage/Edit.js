import { Fragment } from "react";
import { updateOrder, deleteOrderNumber } from "../../../store/product";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  TextField,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  root: {
    padding: theme.spacing(4),
  },
  title: {
    color: theme.palette.action.active,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    color: theme.palette.action.active,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  button: {
    boxShadow: "none",
    margin: theme.spacing(1),
  },

  active: {
    color: theme.palette.primary.main,
  },
}));

export default function Edit({
  formData,
  setFormData,
  onClose,
  setChange,
  change,
}) {
  const classes = useStyles();

  const save = async () => {
    await updateOrder(formData).then(() => {
      if (change === false) {
        setChange(true);
      } else {
        setChange(false);
      }
    });
  };
  const deleteOrder = async () => {
    await deleteOrderNumber(formData._id);
    if (change === false) {
      setChange(true);
    } else {
      setChange(false);
    }
  };
  return (
    <Fragment>
      <Box>
        <form className={classes.root}>
          <Typography variant="h6" className={classes.subtitle} gutterBottom>
            Información de orden
          </Typography>
          <Box>
            <TextField
              id="customer-first-name"
              label="Nombre"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
              value={formData.name}
              className={classes.textfield}
              variant="outlined"
            />
            <TextField
              id="customer-lastName"
              label="Apellido"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  lastName: e.target.value,
                });
              }}
              value={formData.lastName}
              className={classes.textfield}
              variant="outlined"
            />
            <TextField
              id="customer-email"
              label="Email"
              style={{ minWidth: "380px" }}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  buyerID: e.target.value,
                });
              }}
              value={formData.buyerID}
              variant="outlined"
              className={classes.textfield}
            />
          </Box>
          <Box>
            <TextField
              id="customer-address"
              label="Datos de entrega"
              style={{ minWidth: "380px" }}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  shippingAddress: e.target.value,
                });
              }}
              value={formData.shippingAddress}
              variant="outlined"
              className={classes.textfield}
            />
            <TextField
              id="customer-phone"
              label="Telefono"
              style={{ minWidth: "380px" }}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  phone: e.target.value,
                });
              }}
              value={formData.phone}
              variant="outlined"
              className={classes.textfield}
            />
          </Box>
          <Box>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Estado del pago
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ minWidth: "380px" }}
                value={formData.status}
                label="Pago"
                className={classes.textfield}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  });
                }}
              >
                <MenuItem value={"Pago"}>PAGADO</MenuItem>
                <MenuItem value={"Pendiente"}>PENDIENTE</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="demo">Estado del pedido</InputLabel>
              <Select
                labelId="demo"
                id="demo"
                className={classes.textfield}
                value={formData.orderStatus}
                style={{ minWidth: "380px" }}
                label="Estado del Pedido"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    orderStatus: e.target.value,
                  });
                }}
              >
                <MenuItem value={"Procesando"}>PROCESANDO</MenuItem>
                <MenuItem value={"Preparacion"}>PREPARACION</MenuItem>
                <MenuItem value={"Logistica"}>LOGISTICA</MenuItem>
                <MenuItem value={"Entregado"}>ENTREGADO</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={onClose}
            >
              Cerrar
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button className={classes.button} onClick={deleteOrder}>
              Borrar
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={save}
            >
              Guardar
            </Button>
          </Box>
        </form>
      </Box>
    </Fragment>
  );
}
