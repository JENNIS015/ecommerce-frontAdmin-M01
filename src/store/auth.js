import axios from "axios";
//import setAuthorizationToken from "./token";
import jwt_decode from "jwt-decode";
import setAuthToken from "./token";
import { urlApi } from "../utils/config";
import {
  SET_CURRENT_USER,
  SET_INVALID_CREDENTIALS,
  SET_INVALID_EMAIL,
  SET_INTERNAL_SERVER_ERROR,
  SET_CONNECTION_REFUSED_ERROR,
  SET_VALID_EMAIL,
  SET_VALID_PASSWORD,
  SET_INVALID_TOKEN,
} from "./code/code";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function setInvalidCredentials(errorStatus) {
  return {
    type: SET_INVALID_CREDENTIALS,
    error: {
      status: errorStatus,
      message:
        "La combinación de correo electrónico o contraseña son incorrrecta. Intenta nuevamente",
    },
  };
}
export function setInvalidEmail(errorStatus) {
  return {
    type: SET_INVALID_EMAIL,
    error: {
      status: errorStatus,
      message: "El correo electrónico no existe. Intenta nuevamente",
    },
  };
}
export function setValidEmail(status) {
  return {
    type: SET_VALID_EMAIL,
    error: {
      status: status,
      message: "Se ha enviado un correo para restaurarlo",
    },
  };
}
export function setInvalidToken(status) {
  return {
    type: SET_INVALID_TOKEN,
    error: {
      status: status,
      message: "El token se ha vencido. Vuelva a restaurar la contraseña",
    },
  };
}
export function setNewPasword() {
  return {
    type: SET_VALID_PASSWORD,
    error: {
      status: 200,
      message: "Se ha restablecido la contraseña.",
    },
  };
}
export function setInternalServerError(errorStatus) {
  return {
    type: SET_INTERNAL_SERVER_ERROR,
    error: {
      status: errorStatus,
      message: "Ocurrio un error inesperado. Por favor intenta nuevamente.",
    },
  };
}

export function setConnectionRefusedError() {
  return {
    type: SET_CONNECTION_REFUSED_ERROR,
    error: {
      status: 502,
      message: "Bad Gateway - Conexion rechazada. Por favor intenta más tarde",
    },
  };
}

export function userSignInRequest(userData) {
  return async (dispatch) => {
    try {
      const respuesta = await axios.post(`${urlApi}/signin`, userData, {
        withCredentials: true,
    
      });

      console.log(respuesta);
      if (respuesta.status === 200) {
        const { token } = respuesta.data;
        localStorage.setItem("token", respuesta.data.token);
        setAuthToken(token);
        const decoded = jwt_decode(token);

        dispatch(setCurrentUser(decoded));
      } else {
        dispatch(setInternalServerError("error"));
      }
    } catch (error) {
      dispatch(setInvalidCredentials("error"));
    }
  };
}

export function userSignOutRequest() {
  localStorage.removeItem("token");
  return async (dispatch) => {
    //  setAuthorizationToken(false);
    dispatch(setCurrentUser({ isAuthenticated: false, user: {}, error: {} }));
  };
}

export function resetPassword(dataObj) {
  return async function (dispatch) {
    await axios({
      method: "post",
      url: `${urlApi}/forgot`,
      data: { email: dataObj },
      contentType: "application/json",
      withCredentials: true,
    })
      .then((res) => dispatch(setValidEmail()))
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 422) {
            dispatch(setInvalidEmail(error.response.status));
          } else {
            dispatch(setInternalServerError(error.response.status));
          }
        } else {
          dispatch(setConnectionRefusedError());
        }
      });
  };
}
export function verifyToken(id, creds) {
  return async function (dispatch) {
    await axios({
      method: "get",
      url: `${urlApi}/reset/${id}`,
      withCredentials: true,
    })
      .then(
        async (res) =>
          await axios({
            method: "post",
            withCredentials: true,
            url: `${urlApi}/reset/${id}`,
            data: { password: creds.password, confirm: creds.verify },
          }),
        dispatch(setNewPasword())
      )
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 422) {
            dispatch(setInvalidToken(error.response.status));
          } else {
            dispatch(setInternalServerError(error.response.status));
          }
        } else {
          dispatch(setConnectionRefusedError());
        }
      });
  };
}
export async function updateUser(userId, dataObj) {
  return await axios({
    method: "put",
    url: `${urlApi}/profile/${userId}`,
    data: dataObj,
    withCredentials: true,
  })
    .then(function (response) {})
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

export const getUser = async (userId) => {
  let response = await axios.get(`${urlApi}/profile/${userId}`, {
    withCredentials: true,
  });
  return response.data.data;
};

export const getAllUser = async () => {
  let response = await axios.get(`${urlApi}/users`, { withCredentials: true });
  return response.data.users;
};

export const deleteUser = async (userId) => {
  let response = await axios.delete(`${urlApi}/user/${userId}`, {
    withCredentials: true,
  });
  return response;
};
