import { useEffect } from "react";

import { Box, Typography, Grid, FormControl } from "@mui/material";
//import ImageUploader from "react-images-upload";

export default function Media({ formData, setFormData }) {
  const handleChange = (file) => {
    setFormData({
      ...formData,
      foto: file,
    });
  };

  useEffect(() => {
    document.getElementsByClassName("deleteImage");
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Imagenes
          </Typography>
          <Typography variant="subtitle1">
            Agrega imagenes a tu producto
          </Typography>
        </Box>
      </Grid>
      <Grid container item xs={8} spacing={2}>
        <div className="container">
          <FormControl>
           
          </FormControl>
        </div>
      </Grid>
    </Grid>
  );
}
