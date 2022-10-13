import { Fragment } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Typography,
  Box,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deleteCategory } from "../../../store/product";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
  tableHead: {
    fontSize: "0.875rem",
    color: "#525f7f",
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  tableHeadCell: {
    padding: theme.spacing(1),
  },
  tableHeadRow: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderStyle: "solid",
    borderLeftWidth: "3px",
  },

  button: {
    margin: theme.spacing(1),
  },

  tableRow: {
    borderColor: "#fff",
    borderStyle: "solid",
    borderLeftWidth: "3px",
    borderBottomWidth: "0px",
    borderTopWidth: "0px",
    borderRightWidth: "3px",
    "&:hover": {
      borderColor: theme.palette.primary.light,
      borderStyle: "solid",
      borderLeftWidth: "3px",

      cursor: "pointer",
    },
  },
}));

function RowOrders(props) {
  
  const classes = useStyles();
  function deleteC(id) {
    deleteCategory(id);
    props.refresh();
  }

  return (
    <Fragment>
      <TableHead>
        <TableRow className={classes.tableHeadRow}>
          <TableCell className={classes.tableHeadCell}>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Typography className={classes.tableHead}> ID</Typography>
            </Box>
          </TableCell>

          <TableCell className={classes.tableHead} align="left">
            Nombre
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!props.data.categoria ? (
          <TableRow></TableRow>
        ) : (
          props.data.categoria.map((row) => (
            <TableRow key={row._id} className={classes.tableRow}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="left">{row.nombre}</TableCell>

              <TableCell align="left">
                <IconButton
                  size="small"
                  aria-label="settings"
                  onClick={() => deleteC(row._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Fragment>
  );
}

export default RowOrders;
