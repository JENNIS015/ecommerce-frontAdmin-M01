import { Fragment } from "react";
import clsx from "clsx";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Fulfillment from "./Fulfillment";
import { Typography, Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadbow: "0 0 11px #eaf0f6",
    borderRadius: "4px",
    overflow: "hidden",
    border: "1px solid #eaf0f6",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "8px",
    overflow: "scroll",
    display: "flex",
  },
  toolbar: {
    // boxShadow: '0 0 1px 0 rgba(0,0,0,.22)',
    boxShadow: "0 0 11px #eaf0f6",
    display: "inline-block",
    marginBottom: theme.spacing(1),
    width: "100%",
  },
  table: {
    minWidth: 400,
  },
  tableHead: {
    fontSize: "0.875rem",
    color: "#525f7f",
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  tableHeadCell: {
    padding: theme.spacing(1),
  },
  tableHeadRow: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderStyle: "solid",
    borderLeftWidth: "3px",
  },
  tableFoot: {
    fontSize: "0.875rem",
    color: "#525f7f",
  },
  button: {
    margin: theme.spacing(1),
  },
  primaryButton: {
    backgroundColor: "#2196f3",
  },
  input: {
    display: "none",
  },
  tableRow: {
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

      cursor: "pointer",
    },
  },
  paidChip: {
    backgroundColor: "#66BB6A",
    color: "#fff",
  },
  unfulfilledChip: {
    backgroundColor: "#F44336",
    color: "#fff",
  },
  active: {
    color: theme.palette.primary.main,
  },
  even: {
    backgroundColor: "#fff",
  },
}));
function StatusChip(props) {
  if (props.status === "Paid") {
    return <Typography variant="body2">PAGADO</Typography>;
  } else {
    return (
      <Chip
        label={props.status?.toUpperCase()}
        style={{ color: "#1A237E", backgroundColor: "#C5CAE9" }}
      />
    );
  }
}

function RowOrders(props) {


 
  const classes = useStyles();
  return (
    <Fragment>
      
        <TableHead>
          <TableRow className={classes.tableHeadRow}>
            <TableCell className={classes.tableHeadCell}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography className={classes.tableHead}>Orden ID</Typography>
                <IconButton
                  style={{ marginLeft: "1px" }}
                  onClick={props.sortById}
                >
                  <UnfoldMoreIcon
                    fontSize="small"
                    className={clsx(props.sortData.id > -1 && classes.active)}
                  />
                </IconButton>
              </Box>
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Creado
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Cliente
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Email
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Dirección
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Estado
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Total
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Pago
            </TableCell>
            <TableCell className={classes.tableHead} align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {!props.data.length ? (
            <TableRow></TableRow>
          ) : (
            props.data
              .slice(
                props.page * props.rowsPerPage,
                props.page * props.rowsPerPage + props.rowsPerPage
              )
              .map((row, index) => (
                <TableRow key={row._id} className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell align="left">{row.timestamps}</TableCell>
                  <TableCell align="left">{`${row.name ? row.name : ""} ${
                    row.lastName ? row.lastName : ""
                  }`}</TableCell>
                  <TableCell align="left">{row.buyerID}</TableCell>
                  <TableCell align="left">{row.shippingAddress}</TableCell>
                  <TableCell align="left">
                    <Fulfillment
                      orderStatus={`${
                        row.orderStatus ? row.orderStatus : "Procesando"
                      }`}
                    />
                  </TableCell>
                  <TableCell align="left">{row.total}</TableCell>
                  <TableCell align="left">
                    <StatusChip status={row.status} />
                  </TableCell>

                  <TableCell align="left">
                    <IconButton
                      size="small"
                      aria-label="settings"
                      onClick={() => props.handleOpen(row)}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      

     
    </Fragment>
  );
}

export default RowOrders;
