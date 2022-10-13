import { React, useState, useEffect } from "react";
 import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getAllUser, deleteUser } from "../store/auth";
import PageTitle from "./../Common/PageTitle";
import Cards from "./Cards";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  paper: {
    boxShadow: "0 0 11px #eaf0f6",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: theme.spacing(4),
  },
  title: {
    marginTop: theme.spacing(4),
  },
  cards: {
    height: "150px",
  },
}));

export default function Users() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const stateEmail = useSelector((state) => state.auth.user.email);

  const deleteByEmailUser = async (user) => {
    await deleteUser(user)
      .then(setData(data.filter((i) => i.email !== user)))
      .catch((e) => {
        // console.log(e);
      });
  };
  useEffect(() => {
    const getData = async () => {
      let dataFromAxios = await getAllUser();
      if (!(dataFromAxios && Array.isArray(dataFromAxios))) {
        setData([]);
      }

      setData(
        Object.values(dataFromAxios).filter((i) => i.email !== stateEmail)
      );
    };
    getData();
  }, []);

  return (
    <Container maxWidth="lg">
      <PageTitle title="Usuarios Registrados" />
      <div className={classes.root}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={data.id}>
              <Cards
                key={item.id}
                item={item}
                setData={setData}
                deleteProp={() => deleteByEmailUser(item.email)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
