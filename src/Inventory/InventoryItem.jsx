import {   useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import { IconDelete, IconEdit } from "../Common/Icons";
import TableRow from "@material-ui/core/TableRow";
import { urlApi } from "../utils/config";
import Checkbox from "@material-ui/core/Checkbox";
import { addFav } from "../store/product";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  buttons: {
    width: "100px",
    display: "flex",
  },
  fav: {
    color: "#de2c2c",
  },
});

export default function InventoryItem({
  row,
  openModal,
  setMessage,
  deleteProd,
  message,
}) {
  const classes = useStyles();
  const [list, setUpdateList] = useState(row);

  const openProductModal = () => {
    openModal(row);
  };

  const deleteProductById = (id) => {
    if (id) {
      deleteProd(id);
      setMessage(" - Eliminado");
    }
  };

  const addFavorite = (id, check) => {
    if (id) {
      addFav(id, check);
    }
  };
  let image = !list.foto[0]
    ? (list.foto = "/default.jpg")
    : list.foto[0].filename;

  return (
    <TableRow key={list.id}>
      <TableCell align="left">
        <img src={urlApi + "/uploads/" + image}  alt={list.id} height={80} />
      </TableCell>

      <TableCell align="left">
        {list.nombre}
        {message}
      </TableCell>
      <TableCell align="left">{list.precio}</TableCell>
      <TableCell align="left">{list.oferta}</TableCell>
      <TableCell align="left">{list.fecha}</TableCell>
      <TableCell align="left">{list.stock}</TableCell>
      <TableCell align="left">{list.modificado}</TableCell>
      <TableCell align="left" className={classes.buttons}>
        <Button size="small" color="primary" onClick={openProductModal}>
          <IconEdit />
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => deleteProductById(list.id)}
        >
          <IconDelete />
        </Button>

        <Checkbox
          icon={
            list.destacado !== true ? (
              <FavoriteBorder />
            ) : (
              <Favorite className={classes.fav} />
            )
          }
          onClick={() =>
            addFavorite(list.id, list.destacado === true ? false : true)
          }
        />
      </TableCell>
    </TableRow>
  );
}
