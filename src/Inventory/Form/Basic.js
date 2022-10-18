import { useRef, useState, useEffect, Fragment } from "react";
 import { makeStyles } from "@mui/styles";
import {
 
  Grid,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { fetchCategory } from "../../store/product";
import Loading from "../../Common/Loading";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginTop: theme.spacing(2),
  },
}));

export default function Basics({ formData, setFormData }) {
  const classes = useStyles();
  const inputLabel = useRef(null);

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
    fetchMyAPI();
  }, []);

  return (
    <Fragment>
      {loading === true ? (
        <Loading />
      ) : (
        <Grid container className={classes.grid} spacing={4}>
          <Grid item className={classes.box} xs={4}>
            <Box>
              <Typography variant="h5" className={classes.title} gutterBottom>
                Basico
              </Typography>
              <Typography variant="subtitle1">
                Datos basicos del producto
              </Typography>
            </Box>
          </Grid>
          <Grid container item className={classes.box} xs={8}>
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="Nombre del producto"
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    nombre: e.target.value,
                  });
                }}
                value={formData.nombre}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="Color"
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    color: e.target.value,
                  });
                }}
                value={formData.color}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Descripcion"
                multiline
                minRows="4"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    descripcion: e.target.value,
                  });
                }}
                value={formData.descripcion}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-category-simple">
                  Categoria
                </InputLabel>
                <Select
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      categoria: e.target.value,
                    });
                  }}
                  value={formData.categoria}
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
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="stock-static"
                label="Stock"
                type="number"
                className={classes.textField}
                margin="normal"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    stock: e.target.value,
                  });
                }}
                value={formData.stock}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
}
