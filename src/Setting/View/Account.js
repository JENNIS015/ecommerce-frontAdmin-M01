import { React, useState, Fragment } from "react";
import { makeStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Loading from "./../../Common/Loading";
import FieldRow from "./../../Common/FieldRow";
import FieldModalUser from "../../Common/FieldModalUser";
import Divider from "@mui/material/Divider";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  label: {
    letterSpacing: ".07272727em",
    fontSize: ".6875rem",
    fontWeight: 500,
    lineHeight: "1rem",
    textTransform: "uppercase",
    color: "#5f6368",
    marginLeft: "10px",
  },
  row: {
    // margin: theme.spacing(1),
    paddingTop: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#f5f5f5",
      cursor: "pointer",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  space: {
    marginTop: "70px",
  },
}));

export default function Account(props) {
  const classes = useStyles();

  const loading = true;

  const [fieldModal, setFieldModal] = useState({
    open: false,
    field: {
      database: null,
      label: null,
      value: null,
    },
  });

  const showFieldModal = (field) => {
    setFieldModal({
      open: true,
      field,
    });
  };

  const handleClose = () => {
    setFieldModal({
      ...fieldModal,
      open: false,
    });
  };

  function Content() {
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Perfil de cuenta
        </Typography>
        <FieldRow
          label="Nombre"
          value={props.data.name || ""}
          openModal={showFieldModal}
          database="name"
        />
        <FieldRow
          label="Apellido"
          value={props.data.lastName || ""}
          database="lastName"
          openModal={showFieldModal}
        />
        <FieldRow label="Email" database="email" value={props.data.email} />
        <FieldRow label="Role" database="membershipID" value="Admin" />
        <FieldRow
          label="Telefono"
          value={props.data.phone || ""}
          openModal={showFieldModal}
          database="phone"
        />
        <Divider className={classes.space} light={true} />

        <Typography variant="h6" gutterBottom>
          Contraseña
        </Typography>

        <FieldRow
          label="Contraseña"
          value={props.data.password || ""}
          openModal={showFieldModal}
          database="password"
        />

        <Modal
          disableAutoFocus={true}
          closeAfterTransition
          open={fieldModal.open}
          onClose={handleClose}
          className={classes.modal}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div style={{ outline: "none" }}>
            <FieldModalUser
              label={fieldModal.field.label}
              saveAs={fieldModal.field.database}
              value={fieldModal.field.value}
              data={props.data}
              setData={props.setData}
              onClose={handleClose}
            />
          </div>
        </Modal>
      </Fragment>
    );
  }

  return (
    <div className={classes.root}>
      {props.auth ? <Loading visible={loading} /> : <Content />}
    </div>
  );
}
