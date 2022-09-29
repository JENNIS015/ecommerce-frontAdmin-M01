import React from "react";
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  TextField,
 
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginTop: theme.spacing(2),
  },
}));
 

export default function Price({formData, setFormData}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.grid} spacing={4}>
      <Grid item className={classes.box} xs={4}>
        <Box>
          <Typography variant="h5" className={classes.title} gutterBottom>
            Precio
          </Typography>
          <Typography variant="subtitle1">
            Indica precio en oferta y precio regular.
          </Typography>
        </Box>
      </Grid>
      <Grid container item className={classes.box} xs={8}>
        <Grid item xs={7}>
          <TextField
            id="regular-price"
            label="Precio regular"
            margin="normal"
            variant="outlined"
            type="number"
            onChange={(e) => {
              setFormData({
                ...formData,
                precio: e.target.value,
              });
            }}
            value={
              formData.precio 
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="offer-price"
            label="Oferta"
            margin="normal"
            type="number"
            variant="outlined"
            onChange={(e) => {
              setFormData({
                ...formData,
                oferta: e.target.value,
              });
            }}
            value={
              formData.oferta 
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="datetime-local"
            label="Fecha"
            type="datetime-local"
            className={classes.textField}
            onChange={(e) => {
              setFormData({
                ...formData,
                fecha: e.target.value,
              });
            }}
            value={
              formData.fecha
            }
       
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
