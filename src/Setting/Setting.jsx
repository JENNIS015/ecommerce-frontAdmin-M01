import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import SettingTabs from "./SettingTabs";
import PageTitle from "./../Common/PageTitle";

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
}));

export default function Settings() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <PageTitle title="Mi Cuenta" />
      <Paper className={classes.paper}>
        <SettingTabs />
      </Paper>
    </Container>
  );
}
