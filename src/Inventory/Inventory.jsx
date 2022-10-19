import { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchProducts, deleteProduct } from "../store/product";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Modal,
  Backdrop,
  Fade,
  Paper,
  Container,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import CreateProduct from "./CreateProduct";
import InventoryItem from "./InventoryItem";
import EmptyInventory from "./EmptyInventory";
import ProductModal from "./ProductModal";
import CreateProductForm from "./CreateProductForm";
import PageTitle from "./../Common/PageTitle";

const useStyles = makeStyles((theme) => ({
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
    zIndex: 1,
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "8px",
    display: "flex",
    width: "100%",
    overflow: "hidden",
  },

  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
  },
  toolbar: {
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
  tableHead:{
    padding:"3px"
  },
  red: {
    backgroundColor: "rgb(9 89 169)",
  },
}));

const Inventory = (props) => {
  const classes = useStyles();

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

  const [createProductModal, setCreateProductModal] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState("N/A");

  useEffect(() => {
    props.dispatch(fetchProducts());
    setLastUpdatedTime(`${new Date().toLocaleString()}`);
  }, // eslint-disable-next-line
  [product]);

  const openCreateNewProductModal = () => {
    setCreateProductModal(true);
  };
  const closeCreateNewProductModal = () => {
    setCreateProductModal(false);
  };

  const handleOpen = (product) => {
    setProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [message, setMessage] = useState("");

  const classDelete = message !== "" ? "classes.red" : "classes.white";
  const table = [
    "Foto",
    "Nombre del producto",
    "Precio",
    "Precio en Oferta",
    "Vigencia Oferta",
    "Stock",
    "Ultima actualización",
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
          
            <Paper className={classes.root}>
               <TableContainer> 
              <Table
                stickyHeader
                aria-label="sticky table"
                className={classes.table}
              >
                <TableHead className={classes.tableHeadRow}>
                  <TableRow>
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
               </TableContainer>
            </Paper>
       
        )}
      </Container>

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

      {/* Create Product Modal */}
      <Modal
        disableAutoFocus={true}
        className={classes.modal}
        open={createProductModal}
        onClose={closeCreateNewProductModal}
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
