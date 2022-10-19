import { useState } from "react";
import ImageUploading from "react-images-uploading";
import styles from "./imageupload.module.css";

function ImageUpload(props) {
  const [images, setImages] = useState([]);
  const maxNumber = 5;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    props.onChange(imageList)
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
            <button onClick={onImageRemoveAll}>Eliminar todas las imagenes</button>
            {imageList.map((image, index) => (
              <div key={index} className={styles.imageitem}>
                <img src={image.data_url} alt="" width="100" />
                <div className={styles.imagewrapper}>
                  <button onClick={() => onImageUpdate(index)}>Actualizar</button>
                  <button onClick={() => onImageRemove(index)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
 
  );
}
export default ImageUpload;