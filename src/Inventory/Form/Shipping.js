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

export default function Shipping({ formData, setFormData }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.grid} spacing={4}>
      <Grid item className={classes.box} xs={4}>
        <Box>
          <Typography variant="h5" className={classes.title} gutterBottom>
            Datos para calcular el envio
          </Typography>
          <Typography variant="subtitle1">Indica medidas y peso.</Typography>
        </Box>
      </Grid>
      <Grid container item className={classes.box} spacing={1} xs={8}>
        <Grid item xs={4}>
          <TextField
            id="largo"
            label="Largo"
            margin="normal"
            variant="outlined"
            type="number"
            onChange={(e) => {
              setFormData({
                ...formData,
                largo: e.target.value,
              });
            }}
            value={formData.largo}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="alto"
            label="Alto"
            margin="normal"
            variant="outlined"
            type="number"
            onChange={(e) => {
              setFormData({
                ...formData,
                alto: e.target.value,
              });
            }}
            value={formData.alto}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="profundidad"
            label="Profundidad"
            margin="normal"
            variant="outlined"
            type="number"
            onChange={(e) => {
              setFormData({
                ...formData,
                profundidad: e.target.value,
              });
            }}
            value={formData.profundidad}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="peso"
            label="Peso"
            margin="normal"
            variant="outlined"
            onChange={(e) => {
              setFormData({
                ...formData,
                peso: e.target.value,
              });
            }}
            value={formData.peso}
            fullWidth
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
