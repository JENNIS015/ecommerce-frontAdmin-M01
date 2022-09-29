import { React, useState } from "react";
import {
  Container,
  Box,
  makeStyles,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Input,
} from "@material-ui/core";
import { saveProduct } from "../store/product";
import Basics from "./Form/Basic";
import Price from "./Form/Price";
import Media from "./Form/Media";
import Shipping from "./Form/Shipping";

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  box: {},
  root: {
    width: "90vw",
  },
  formControl: {
    minWidth: 100,
    marginTop: theme.spacing(2),
  },
  button: {
    boxShadow: "none",
  },
  content: {
    minHeight: 400,
  },
}));

export default function CreateProductForm({onClose}) {
  const classes = useStyles();
  const getSteps = () => {
    return ["Basico", "Precio", "Imagenes", "Envio"];
  };

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    color: "",
    categoria: "",
    stock: 0,
    precio: 0,
    oferta: 0,
    fecha: "",
    alto: 0,
    largo: 0,
    profundidad: 0,
    peso: 0,
    foto: [],
  });


  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Basics formData={formData} setFormData={setFormData} />;
      case 1:
        return <Price formData={formData} setFormData={setFormData} />;
      case 2:
        return <Shipping formData={formData} setFormData={setFormData} />;
      case 3:
        return <Media formData={formData} setFormData={setFormData} />;
        default:return;
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  const save = async () => {
    await saveProduct(formData, setFormData, handleReset);

  };

  return (
    <Container className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box className={classes.content}>{getStepContent(activeStep)}</Box>

      <Grid container style={{ marginTop: "2em" }}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={onClose}
          >
            Cerrar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            {activeStep > 0 ? (
              <Button
                color="primary"
                className={classes.button}
                style={{ marginRight: "1em" }}
                onClick={handleBack}
              >
                Átras
              </Button>
            ) : null}
            {activeStep === steps.length - 1 ? (
              <Input
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={save}
                type="submit"
              >
                Finalizar
              </Input>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleNext}
              >
                Siguiente
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
