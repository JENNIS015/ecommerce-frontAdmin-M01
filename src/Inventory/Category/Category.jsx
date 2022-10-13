import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Loading from "../../Common/Loading";
import { Container, Box } from "@mui/material";
import PageTitle from "../../Common/PageTitle";
import { fetchCategory } from "../../store/product";
import CategoryTable from "./CategoryTable";

const Category = (props) => {
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState([]);

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

      try {
        let response = await fetchCategory();

        response = await response.data;
        setCategory(response);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchMyAPI();
  }, [change]);

  const CategoryMain = (props) => {
    return (
      <Container maxWidth="lg">
        <PageTitle title="Administrar todas las Categorias" />
        <Box display="flex" flexGrow={1}>
          <Box
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
            alignItems="center"
          ></Box>
        </Box>

        <CategoryTable category={category} refresh={refresh} />
      </Container>
    );
  };

  return <Fragment>{loading ? <Loading /> : <CategoryMain />}</Fragment>;
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(Category);
