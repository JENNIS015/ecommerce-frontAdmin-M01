import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import data from "./Data";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "1em",
  },
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },

  card: {
   
 
    boxShadow: "0 0 1px 0 rgba(0,0,0,.22)",
    boxShadow:
      "0 0.938em 1.588em rgba(50,50,93,.1), 0 0.313em 0.938em rgba(0,0,0,.07)",
  },
  media: {
    userSelect: "none",
    pointerEvents: "none",
    maxHeight:"300px",
    maxWidth:"400px"
  },
}));

function Home() {
  const classes = useStyles();
  console.log(data);
  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container spacing={2} columns={1}>
        {data.map((item) => (
          <Grid key={item.title} item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardMedia
                component="img"
                alt={item.title}
                image={item.image}
                className={classes.media}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={item.route}
                >
                  {item.button}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
