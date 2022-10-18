import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import TabButton from "./TabButton";
import Account from "./View/Account";
import Notifications from "./View/Notification";

import { getUser } from "../store/auth";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500,
  },
  tabs: {
    borderRight: `1px solid rgba(0,0,0,.08)`,
    textAlign: "left",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const state = useSelector((state) => state.auth);

  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const dataFromAxios = await getUser(state.user.email);
      setData(dataFromAxios);
    };
    getData();
  }, [state.user]);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label={<TabButton icon="account" text="Cuenta" />}
          {...a11yProps(0)}
        />
        <Tab
          label={<TabButton icon="notifications" text="Notificaciones" />}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Account data={data} setData={setData} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Notifications />
      </TabPanel>
    </div>
  );
}
