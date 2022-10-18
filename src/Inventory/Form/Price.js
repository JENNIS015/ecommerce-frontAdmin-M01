import { Grid, Box, Typography, TextField } from "@mui/material";

export default function Price({ formData, setFormData }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Precio
          </Typography>
          <Typography variant="subtitle1">
            Indica precio en oferta y precio regular.
          </Typography>
        </Box>
      </Grid>
      <Grid container item xs={8}>
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
            value={formData.precio}
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
            value={formData.oferta}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <p>Duración oferta</p>
          <TextField
            id="datetime-local"
            type="datetime-local"
            onChange={(e) => {
              setFormData({
                ...formData,
                fecha: e.target.value,
              });
            }}
            value={formData.fecha}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
