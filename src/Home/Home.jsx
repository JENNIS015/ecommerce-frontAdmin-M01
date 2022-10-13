import React from "react";
import Container from "@mui/material/Container";
 import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import data from "./Data";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "1em",
  },
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    fontWeight: "600",
  },

  card: {
    display: "flex",
    background: "#f0f0f0",
    margin: "10px",
    minHeight: "200px",
    border: "1px solid #dddddd",
  },
  media: {
    userSelect: "none",
    pointerEvents: "none",
    maxHeight: "200x",
    maxWidth: "200px",
  },
  btn: {
    background: "#000000",
    padding: "5px 20px",
    color: "white",
    alignItems: "flex-end",
    marginTop: "20px",
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container>
        {data.map((item) => (
          <Grid key={item.title} item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardMedia
                component="img"
                alt={item.title}
                image={item.image}
                className={classes.media}
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>

                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={item.route}
                  className={classes.btn}
                >
                  {item.button}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
