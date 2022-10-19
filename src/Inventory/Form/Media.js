import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ImageUpload from "../../Common/ImageUpload";

export default function Media({ formData, setFormData }) {
  // const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(
    () => {
      setFormData({
        ...formData,
        foto: images,
      });
    },
    // eslint-disable-next-line
    [images]
  );

  // const onSelectFile = (event) => {
  //   const selectedFiles = event.target.files;

  //   const selectedFilesArray = Array.from(selectedFiles);
  //   const imagesArray = selectedFilesArray.map((file) => {
  //     return [URL.createObjectURL(file), file];
  //   });

  //   console.log(imagesArray);
  //   setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  //   setImages((previousImages) => previousImages.concat(selectedFilesArray));
  //   // FOR BUG IN CHROME
  //   event.target.value = "";
  // };

  // function deleteHandler(image) {
  //   setSelectedImages(selectedImages.filter((e) => e !== image));
  //   const index = images.findIndex((x) => x.name === image.name);

  //   setImages(images.splice(index, 1));
  //   URL.revokeObjectURL(image);
  // }

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

          {/* 
          <input
            type="file"
            name="images"
            onChange={onSelectFile}
            multiple
            accept="image/png , image/jpeg, image/webp"
          />

          {selectedImages.length > 0 &&
            (selectedImages.length > 10 ? (
              <p className="error">
                No puedes subir más de 10 imagenes! <br />
                <span>
                  por favor borrar <b> {selectedImages.length - 10} </b>{" "}
                  imagenes
                </span>
              </p>
            ) : (
              ""
            ))}

          <div className="images">
            {selectedImages &&
              selectedImages.map((image, index) => {
                return (
                  <div key={image} className="image">
                    <img src={image[0]} height="200" alt="upload" />
                    <button onClick={() => deleteHandler(image)}>
                      delete image
                    </button>
                    <p>{index + 1}</p>
                  </div>
                );
              })}
          </div> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
