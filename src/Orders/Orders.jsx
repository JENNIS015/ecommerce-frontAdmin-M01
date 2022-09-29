import { useState, React, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { fetchOrders } from "../store/product";
import Loading from "../Loading/Loading";
import {
  IconButton,
  Container,
  Box,
  Tooltip,
} from "@material-ui/core/";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import blue from "@material-ui/core/colors/blue";
import OrdersTable from "./OrdersTable";
import PageTitle from "./../Common/PageTitle";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    zIndex: 0,
  },
  drawer: {
    width: 210,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  toolbar: {
    boxShadow: "0 0 11px #eaf0f6",
    display: "inline-block",
    marginBottom: theme.spacing(1),
    width: "100%",
  },

  action: {
    marginLeft: "auto",
    marginTop: "0.8rem",
    marginRight: theme.spacing(2),
  },
  lastUpdated: {
    marginTop: theme.spacing(2),
    padding: 0,
    color: "rgb(112, 117, 122)",
  },
  iconButton: {
    margin: theme.spacing(1),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "8px",
    overflow: "scroll",
    display: "flex",
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: blue[100],
    borderRadius: "30px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& $icon": {
        color: "white",
      },
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

const Orders = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const [orders, setOrder] = useState({});

  const [change, setChange] = useState(false);

  const refresh = () => {
    if (change === false) {
      setChange(true);
    } else {
      setChange(false);
    }
  };
 
  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      console.log("Obteniendo datos...");

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

  const OrdersMain = (props) => {
    return (
      <Container maxWidth="lg">
        <PageTitle title="Orders" />
        <Box display="flex" flexGrow={1}>
          <Tooltip title="Refresh" placement="top">
            <IconButton className={classes.iconButton}>
              <RefreshIcon onClick={refresh} />
            </IconButton>
          </Tooltip>
        
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
