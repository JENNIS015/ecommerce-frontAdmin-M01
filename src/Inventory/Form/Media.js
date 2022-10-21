import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ImageUpload from "../../Common/ImageUpload";

export default function Media({ formData, setFormData }) {
  // const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  console.log(images);

  useEffect(
    () => {
      const files = [];
      if (images.length) {
        images[1].map((i) => files.push(i.path));
      }
      setFormData({
        ...formData,
        foto: files,
      });
    },
    // eslint-disable-next-line
    [images]
  );

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
        <Grid item xs={12}>
          <Typography variant="subtitle1">Agrega hasta 10 imagenes</Typography>

          <ImageUpload onChange={setImages} />
        </Grid>
      </Grid>
    </Grid>
  );
}
