import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },

  content: {
    textAlign: "left",
    padding: "10px",
  },
  divider: {
    margin: `3px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: "0.75rem",
  },
  avatar: {
    fontFamily: "Ubuntu",
    fontSize: "0.875rem",
    backgroundColor: "#6d7efc",
  },
}));

export default function Cards({ item, deleteProp }) {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card} key={item.id}>
        <CardContent className={classes.content}>
          <Box p={2} gap={2}>
            <Avatar
              className={classes.logo}
              variant={"rounded"}
              src={item.avatar}
            />

            <Typography variant="h5">
              {item.name + "" + item.lastName}
            </Typography>
            <Typography>
              {item.membershipID !== 1 ? "Comprador" : "Administrador"}
            </Typography>
          </Box>
          <Box
            pb={1}
            px={2}
            color={"grey.600"}
            fontSize={"0.875rem"}
            fontFamily={"Ubuntu"}
          >
            <Typography> {item.email}</Typography>
            <Typography>{item.address}</Typography>

            <Typography>{item.phone}</Typography>
          </Box>

          <Divider className={classes.divider} light />
          <Button
            variant={"contained"}
            onClick={deleteProp}
            color={"primary"}
            disableRipple
          >
            Eliminar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
