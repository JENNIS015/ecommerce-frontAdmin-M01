import React from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    height: "240px",

    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },

  content: {
    padding: "10px",

  },
  divider: {
    margin: `3px 0`,
  },
  title: {
    fontWeight: "500",
    textTransform:"uppercase",
  },

  btn: {
    marginTop: "20px",
    background: "#000",
    color: "#fff",
  },
}));

export default function Cards({ item, deleteProp }) {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card} key={item.id}>
        <CardContent className={classes.content}>
          <Box p={2} gap={2} className={classes.heading}>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
              {item.name + "" + item.lastName}
            </Typography>
            <Divider className={classes.divider} light />
            <Typography>
              {item.membershipID !== 1 ? "Comprador" : "Administrador"}
            </Typography>
          </Box>

          <Box pb={1} px={2}>
            <Typography>
              <span>Email: </span>
              {item.email}
            </Typography>
            {item.address ? (
              <Typography>
                (<span>Dirección: </span>
                {item.address}
              </Typography>
            ) : (
              ""
            )}
            {item.phone ? (
              <Typography>
                <span>Contacto: </span>
                {item.phone}
              </Typography>
            ) : (
              ""
            )}
            <Button
              variant={"contained"}
              className={classes.btn}
              onClick={deleteProp}
              disableRipple
            >
              Eliminar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
