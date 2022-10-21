import { useState, React, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import NotAdmin from "../403/NotAdmin";
import { fetchOrders } from "../store/product";
import Loading from "../Loading/Loading";
import { Container, Box } from "@mui/material/";

import OrdersTable from "./OrdersTable";
import PageTitle from "./../Common/PageTitle";

const Orders = (props) => {
  const [loading, setLoading] = useState(false);

  const [orders, setOrder] = useState({});

  const [change, setChange] = useState(false);
  const [err, setErr] = useState(false);
  console.log(err)
  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);

      try {
        let response = await fetchOrders();
        response = await response.data;
        setOrder(response.data);
        setLoading(false);
      } catch {
 
        setErr(true)
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

  return <Fragment>{loading ? <Loading /> : err? <NotAdmin/>:<OrdersMain />}</Fragment>;
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(Orders);
