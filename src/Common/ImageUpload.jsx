import { useState } from "react";
import ImageUploading from "react-images-uploading";
import styles from "./imageupload.module.css";
import { Grid } from "@mui/material";

function ImageUpload(props) {
  const [images, setImages] = useState([]);
  const maxNumber = 10;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    props.onChange(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
      acceptType={["jpg"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <button
            style={isDragging ? { color: "red" } : null}
            onClick={onImageUpload}
            {...dragProps}
          >
            Subir Imagenes
          </button>
          &nbsp;
          <button onClick={onImageRemoveAll}>
            Eliminar todas las imagenes
          </button>
          <Grid container spacing={1}>
            {imageList.map((image, index) => (
              <Grid item xs={12} sm={6}>
                <div key={index} className={styles.imageitem}>
                  <img src={image.data_url} alt="" width="100" />
                  <div className={styles.imagewrapper}>
                    <button onClick={() => onImageUpdate(index)}>
                      Actualizar
                    </button>
                    <button onClick={() => onImageRemove(index)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </ImageUploading>
  );
}
export default ImageUpload;
