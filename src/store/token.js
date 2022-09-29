import axios from "axios";

// Given a token, we want to add token to headers for every request.
export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
