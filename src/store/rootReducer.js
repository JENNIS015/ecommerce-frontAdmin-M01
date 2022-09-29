import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import product from "./productReducer";
import auth from "./authReducer";
import thunk from "redux-thunk";
 
const reducers = combineReducers({
  product,
  auth: auth,
});

const store = configureStore({
  reducer: reducers,
   devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
