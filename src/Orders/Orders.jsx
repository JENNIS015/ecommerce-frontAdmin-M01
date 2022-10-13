import { useState, React, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import { fetchOrders } from "../store/product";
import Loading from "../Loading/Loading";
import { Container, Box } from "@material-ui/core/";

import OrdersTable from "./OrdersTable";
import PageTitle from "./../Common/PageTitle";

const Orders = (props) => {
  const [loading, setLoading] = useState(false);

  const [orders, setOrder] = useState({});

  const [change, setChange] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);

      try {
        let response = await fetchOrders();
        response = await response.data;
        setOrder(response.data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchMyAPI();
  }, [change]);

  const OrdersMain = () => {
    return (
      <Container maxWidth="lg">
        <PageTitle title="Ordenes" />
        <Box display="flex" flexGrow={1}>
          <Box
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
            alignItems="center"
          ></Box>
        </Box>

        <OrdersTable orders={orders} setChange={setChange} change={change} />
      </Container>
    );
  };

  return <Fragment>{loading ? <Loading /> : <OrdersMain />}</Fragment>;
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(Orders);
