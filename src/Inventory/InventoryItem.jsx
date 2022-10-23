import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import { IconDelete, IconEdit } from "../Common/Icons";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { addFav } from "../store/product";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { cloudinary } from "../utils/config";
const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  tableCell: {
    padding: "0px",
  },
  buttons: {
    width: "200px",
    display: "table-cell",
  },
  fav: {
    color: "#de2c2c",
  },
});

export default function InventoryItem({
  row,
  openModal,
  deleteProd,
}) {
  const classes = useStyles();
  const list = row;
  const [message, setMessage] = useState("");
  const openProductModal = () => {
    openModal(row);
  };

  const deleteProductById = (id) => {
    if (id) {
      deleteProd(id);
      setMessage(" Eliminado");
    }
  };

  const addFavorite = (id, check) => {
    if (id) {
      addFav(id, check);
    }
  };
  let image = !list.foto
    ? (list.foto = "/default.jpg")
    : `https://res.cloudinary.com/${cloudinary.id}/image/upload/${cloudinary.album}/${list.foto[0]}.jpg`;

  return (
    <TableRow key={list.id}>
      <TableCell className={classes.tableCell} align="left">
        <img src={image} alt={list.id} height={60} />
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
