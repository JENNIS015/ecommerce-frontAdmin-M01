import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CreateProduct from "./CreateProductForm";
import PageTitle from "../Common/PageTitle";

const useStyles = makeStyles((theme) => ({
  action: {
    marginLeft: "auto",
    marginTop: "0.8rem",
    marginRight: theme.spacing(2),
  },

  toolbar: {
    boxShadow: "0 0 11px #eaf0f6",
    display: "inline-block",
    marginBottom: theme.spacing(1),
    width: "100%",
  },
}));

const Inventory = () => {
  const classes = useStyles();
  const [createProductModal, setCreateProductModal] = useState(false);

  const openCreateNewProductModal = () => {
    setCreateProductModal(true);
  };

  return (
    <Fragment>
      <Container>
        <PageTitle title="Productos" />
        <Paper className={classes.toolbar}>
          <div style={{ display: "flex" }}>
            <div className={classes.action}>
              <CreateProduct createProduct={openCreateNewProductModal} />
            </div>
          </div>
        </Paper>
      </Container>
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
