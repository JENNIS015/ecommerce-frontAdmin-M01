import { makeStyles } from "@material-ui/core/styles";
import AccountIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "4px",
    fontSize: "1em",
    width: 175,
    marginLeft: theme.spacing(2),
 
  },
  leftIcon: {
    marginRight: theme.spacing(2),
  },
  text: {
    marginBottom: "5px",
  },
}));

export default function TabButton(props) {
  const classes = useStyles();

  function GetIcon() {
    switch (props.icon) {
      case "account":
        return <AccountIcon className={classes.leftIcon} />;
      case "notifications":
        return <NotificationsIcon className={classes.leftIcon} />;
      default:
        throw new SyntaxError("Invalid button type");
    }
  }

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.button}
    >
      <Grid item>
        <GetIcon />
      </Grid>
      <Grid item className={classes.text}>
        {props.text}
      </Grid>
    </Grid>
  );
}
