import { React, useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchProducts, deleteProduct } from "../store/product";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";

import { Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import CreateProduct from "./CreateProduct";
import SearchIcon from "@material-ui/icons/Search";

import InventoryItem from "./InventoryItem";
import EmptyInventory from "./EmptyInventory";
import SearchModal from "./SearchModal";
import ProductModal from "./ProductModal";
import CreateProductForm from "./CreateProductForm";
import PageTitle from "./../Common/PageTitle";


const useStyles = makeStyles((theme) => ({
  fab: {
    margin: 0,
    top: "auto",
    left: "auto",
    position: "fixed",
    bottom: theme.spacing(7),
    right: theme.spacing(7),
  },
  action: {
    marginLeft: "auto",
    marginTop: "0.8rem",
    marginRight: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  createProductModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "8px",
    overflow: "scroll",
    display: "flex",
  },
  emptyIcon: {
    color: "#00000032",
    fontSize: "10em",
  },
  emptyContainer: {
    marginTop: "25vh",
  },
  title: {
    fontFamily: "ApercuMedium",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
  },
  toolbar: {
    // boxShadow: '0 0 1px 0 rgba(0,0,0,.22)',
    boxShadow: "0 0 11px #eaf0f6",
    display: "inline-block",
    marginBottom: theme.spacing(1),
    width: "100%",
  },
  lastUpdated: {
    marginTop: theme.spacing(2),
    padding: 0,
    color: "rgb(112, 117, 122)",
  },
  white: {
    backgroundColor: "rgb(9 89 169)",
  },
  red: {
    backgroundColor: "rgb(9 89 169)",
  },
}));

const Inventory = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    color: "",
    categoria: "",
    stock: 0,
    precio: 0,
    fecha: "",
    oferta: 0,
    alto: 0,
    largo: 0,
    profundidad: 0,
    peso: 0,
    foto: [],
  });

  const [searchModal, setSearchModal] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState("N/A");

  useEffect(() => {
    props.dispatch(fetchProducts());
    setLastUpdatedTime(`${new Date().toLocaleString()}`);
  }, [product]);

  const openSearchModal = () => {
    setSearchModal(true);
  };
  const openCreateNewProductModal = () => {
    setCreateProductModal(true);
  };
    const closeCreateNewProductModal = () => {
      console.log("AH")
      setCreateProductModal(false);
    };
  const closeSearchModal = () => {
    setSearchModal(false);
  };

  const handleOpen = (product) => {
    setProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [message, setMessage] = useState("");
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
 
  const classDelete = message !== "" ? "classes.red" : "classes.white";
  const table = [
    "Foto",
    "Nombre del producto",
    "Precio",
    "Precio en Oferta",
    "Vigencia Oferta",
    "Stock",
    "Ultima actulización",
  ];
  return (
    <Fragment>
      <Container maxWidth="lg">
        <PageTitle title="Productos" />
        <Paper className={classes.toolbar}>
          <div style={{ display: "flex" }}>
            <div className={classes.action}>
              <CreateProduct createProduct={openCreateNewProductModal} />
            </div>
          </div>
        </Paper>
        <Container className={classes.lastUpdated}>
          <Typography variant="overline">
            Inventario al día. Última actualización {lastUpdatedTime}
          </Typography>
        </Container>

        {props.products.length === 0 || props.products.length === null ? (
          <EmptyInventory />
        ) : (
          <Fragment>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow className={classes.tableHeadRow}>
                    {table.map((item) => (
                      <TableCell
                        key={item}
                        className={classes.tableHead}
                        align="left"
                      >
                        {item}
                      </TableCell>
                    ))}
                    <TableCell className={classes.tableHead} align="left" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.products.map((product) => (
                    <InventoryItem
                      row={product}
                      key={product.id}
                      openModal={handleOpen}
                      deleteProd={deleteProduct}
                      makeStyles={classDelete}
                      setMessage={setMessage}
                      message={message}
                    />
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Fragment>
        )}
      </Container>
      {/* Button open search modal */}
      <Zoom
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        in={true}
        unmountOnExit
      >
        <Fab
          color="primary"
          className={classes.fab}
          aria-label="search"
          onClick={openSearchModal}
        >
          <SearchIcon />
        </Fab>
      </Zoom>

      <Modal
        disableAutoFocus={true}
        className={classes.modal}
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <ProductModal
              onClose={handleClose}
              product={product}
              setProduct={setProduct}
            />
          </div>
        </Fade>
      </Modal>

      {/* Search Modal */}
      <Modal
        disableAutoFocus={true}
        className={classes.modal}
        open={searchModal}
        onClose={closeSearchModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
      >
        <Fade in={searchModal}>
          <div className={classes.paper}>
            <SearchModal onClose={closeSearchModal} />
          </div>
        </Fade>
      </Modal>

      {/* Create Product Modal */}
      <Modal
        disableAutoFocus={true}
        className={classes.modal}
        open={createProductModal}
        onClose={closeSearchModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
      >
        <Fade in={createProductModal}>
          <div className={classes.paper}>
            <CreateProductForm onClose={closeCreateNewProductModal} />
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
};

Inventory.defaultProps = {
  products: [],
};

Inventory.propTypes = {
  products: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    products: state.product.products,
  };
}

export default connect(mapStateToProps, null)(Inventory);
