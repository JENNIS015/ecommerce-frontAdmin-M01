import React from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  Typography,
  makeStyles,
  Paper,
} from "@mui/material";

import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  tableHeadRow: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderStyle: "solid",
    borderLeftWidth: "3px",
  },

  headerCell: {
    padding: theme.spacing(0),
  },
  headerText: {
    fontSize: "0.875rem",
    color: "#525f7f",
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  row: {
    borderColor: "#fff",
    borderStyle: "solid",
    borderLeftWidth: "3px",
    borderBottomWidth: "0px",
    borderTopWidth: "0px",
    borderRightWidth: "3px",
    "&:hover": {
      borderColor: theme.palette.primary.light,
      borderStyle: "solid",
      borderLeftWidth: "3px",
    },
  },
  root: {
    boxShadow: "0 0 11px #eaf0f6",
    borderRadius: "4px",
    overflow: "hidden",
    border: "1px solid #eaf0f6",
  },
}));

const TableBuilder = (props) => {
  const classes = useStyles();

  const { data } = props;

  const getKeys = () => {
    return Object.keys(data[0]);
  };

  const getHeader = () => {
    const keys = getKeys();

    return keys.map((key, index) => {
      return (
        <TableCell align="left" className={classes.headerCell} key={key}>
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Typography className={classes.headerText}>{key}</Typography>
            <IconButton style={{ marginLeft: "1px" }}>
              <UnfoldMoreIcon fontSize="small" />
            </IconButton>
          </Box>
        </TableCell>
      );
    });
  };

  const RenderRow = (props) => {
    return props.keys.map((key, index) => {
      return <TableCell key={key}>{props.data[key]}</TableCell>;
    });
  };

  const getRowsData = () => {
    const keys = getKeys();
    return data.map((row, index) => {
      return (
        <TableRow key={index} className={classes.row}>
          <RenderRow key={index} data={row} keys={keys} />
          <TableCell align="right">
            <IconButton aria-label="settings" size="small">
              <KeyboardArrowRightIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableHeadRow}>
            {getHeader()}

            <TableCell align="left" className={classes.tableHead} />
          </TableRow>
        </TableHead>
        <TableBody>{getRowsData()}</TableBody>
      </Table>
    </Paper>
  );
};

export default TableBuilder;
