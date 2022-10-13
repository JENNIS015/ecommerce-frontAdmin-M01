import { Grid, Box, Typography, TextField } from "@mui/material";

export default function Shipping({ formData, setFormData }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Datos para calcular el envio
          </Typography>
          <Typography variant="subtitle1">Indica medidas y peso.</Typography>
        </Box>
      </Grid>
      <Grid container item spacing={1} xs={8}>
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
