import { React, Fragment, useState    } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
 
import { saveCategory } from "../../store/product";
 
import {
 
  Button,
  Table,
  Grid,
  Box,
  TextField,
  Typography,
} from "@material-ui/core";
import RowOrders from "./Table/RowOrders";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "8px",
    overflow: "scroll",
    display: "flex",
  },
  toolbar: {
    boxShadow: "0 0 11px #eaf0f6",
    display: "inline-block",
    marginBottom: theme.spacing(1),
    width: "100%",
  },
 
  
  button: {
    margin: theme.spacing(1),
  },
  primaryButton: {
    backgroundColor: "#2196f3",
  },
}));

export default function CategoryTable({ category, refresh }) {
  // const row = orders ? orders : props;
  const classes = useStyles();

  const [formData, setFormData] = useState(category);
  const [categories, saveCategories] = useState();

  const save = async () => {
    await saveCategory(categories, saveCategories).then(() => refresh());
  };

  return (
    <Fragment>
      <Paper>
        <Grid item xs={4} className={classes.boxColor}>
          <Box>
            <Typography variant="subtitle1">Agregar Categoria</Typography>
          </Box>

          <Grid item xs={12}>
            <TextField
              id="outlined-name"
              label="Nombre de categoria"
              margin="normal"
              variant="outlined"
              onChange={(e) => {
                saveCategories({
                  nombre: e.target.value,
                });
              }}
              fullWidth
              required
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={save}
            type="submit"
          >
            Enviar
          </Button>
        </Grid>
        <hr></hr>

        <Table className={classes.table}>
          <RowOrders data={formData} refresh={refresh} />
        </Table>
      </Paper>
      <div style={{ width: "100%", marginTop: "1em" }}></div>
    </Fragment>
  );
}
