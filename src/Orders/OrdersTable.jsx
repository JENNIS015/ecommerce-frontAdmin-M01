import { React, Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableFooter,
  TablePagination,
  Paper,
  Modal,
  Backdrop,
  Fade,
 
  Table,
} from "@material-ui/core";
import RowOrders from "./Table/RowOrders";
import Edit from "./Manage/Edit";
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "8px",
    overflow: "scroll",
    display: "flex",
  },
  toolbar: {
    boxShadow: "0 0 11px #eaf0f6",
    display: "inline-block",
    marginBottom: theme.spacing(1),
    width: "100%",
  },

  button: {
    margin: theme.spacing(1),
  },
}));

export default function OrdersTable({ orders, setChange, change }) {
  const classes = useStyles();

 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPage(0);
  }, [ ]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [data, setData] = useState(orders);
  const [sortData, setSortData] = useState({
    id: -1,
  });

  const sortById = () => {
    const dataset = [...data];

    if (sortData.id < 1) {
      dataset.sort(function (a, b) {
        return a.orderId - b.orderId;
      });
      setSortData({
        ...sortData,
        id: 1,
      });
    } else {
      dataset.reverse();
      setSortData({
        ...sortData,
        id: 0,
      });
    }
    setData(dataset);
  };
  const handleChangePage = (event, newPage) => setPage(newPage);
  const [formData, setFormData] = useState({});
  const [open, setOpenModal] = useState(false);

  const handleOpen = (order) => {
    setFormData(order);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Fragment>
      <Paper className={classes.toolbar}>
        <Table className={classes.table}>
          <RowOrders
            sortData={sortData}
            data={data}
            sortById={sortById}
            page={page}
            rowsPerPage={rowsPerPage}
            handleOpen={handleOpen}
          />
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
        <Modal
          disableAutoFocus={true}
          className={classes.modal}
          open={open}
          onClose={handleClose}
          BackdropComponent={Backdrop}
          closeAfterTransition
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Edit
                formData={formData}
                setFormData={setFormData}
                onClose={handleClose}
                setChange={setChange}
                change={change}
              />
            </div>
          </Fade>
        </Modal>
      </Paper>
      <div style={{ width: "100%", marginTop: "1em" }}></div>
    </Fragment>
  );
}
