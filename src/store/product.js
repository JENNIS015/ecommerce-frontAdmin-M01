import axios from "axios";
import { urlApi } from "../utils/config";
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_PENDING,
} from "./code/code";

export function fetchProductsPending() {
  return {
    type: FETCH_PRODUCTS_PENDING,
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products,
  };
}

export function fetchProductsError(error) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    error,
  };
}

export function fetchProducts() {
  return async (dispatch) => {
    try {
      dispatch(fetchProductsPending());
      const res = await axios.get(`${urlApi}/api/productos`, {
        withCredentials: true,
        credentials: "include",
      });
      if (res.data && res.status === 200) {
        dispatch(fetchProductsSuccess(res.data.product));
      }
    } catch (error) {
      dispatch(fetchProductsError(error));
 
    }
  };
}

export async function saveProduct(formData, setFormData, handleReset) {
  return await axios({
    method: "post",
    url: `${urlApi}/api/productos`,
    data: formData,
    withCredentials: true,
    credentials: "include",
  })
    .then(function (response) {})
    .catch(function (response) {
      // console.log(response);
    })
    .finally(() => {
      handleReset();
      setFormData({
        nombre: "",
        descripcion: "",
        color: "",
        categoria: "",
        stock: "",
        precio: "",
        oferta: "",
        fecha: "",
        alto: "",
        largo: "",
        profundidad: "",
        peso: "",
        foto: [],
      });
    });
}

export async function saveCategory(categories, saveCategories) {
  return await axios({
    method: "post",
    url: `${urlApi}/api/categorias`,
    data: categories,
    withCredentials: true,
    credentials: "include",
  })
    .then(function (response) {})
    .catch(function (response) {
      // console.log(response);
    })
    .finally(() => {
      saveCategories({
        nombre: "",
      });
    });
}

export async function fetchCategory() {
  return await axios({
    method: "get",
    url: `${urlApi}/api/categorias`,
    withCredentials: true,
    credentials: "include",
  });
}

export async function deleteCategory(categoryID) {
 
  return await axios({
    method: "delete",
    url: `${urlApi}/api/categorias/${categoryID}`,
    withCredentials: true,
    credentials: "include",
  });
}
export async function deleteProduct(productID) {
 
  return await axios({
    method: "delete",
    url: `${urlApi}/api/productos/${productID}`,
    withCredentials: true,
    credentials: "include",
  });
  
}
export async function addFav(productID, check) {

  return await axios({
    method: "put",
    url: `${urlApi}/api/productos/${productID}`,
    data: { destacado: check },
    withCredentials: true,
    credentials: "include",
    headers: { "content-type": "multipart/form-data" },
  });
}
 
export async function updateProduct(productID, dataObj) {
  return await axios({
    method: "put",
    url: `${urlApi}/api/productos/${productID}`,
    data: dataObj,
    withCredentials: true,
    credentials: "include",
    headers: { "content-type": "multipart/form-data" },
  });
    
}

export async function deletePic(productID, dataObj) {
  return await axios({
    method: "put",
    url: `${urlApi}/api/productos/imagen/${productID}`,
    data: dataObj,
    withCredentials: true,
    credentials: "include",
  })
    .then(function (response) {})
    .catch(function (response) {
      //handle error
      // console.log(response);
    });
}

export async function fetchOrders() {
  return await axios({
    method: "get",
    url: `${urlApi}/api/pedido`,
    withCredentials: true,
    credentials: "include",
  });
}

export async function updateOrder(formData) {
  return await axios({
    method: "put",
    url: `${urlApi}/api/pedido/${formData._id}`,
    data: formData,
    withCredentials: true,
    credentials: "include",
  });
}

export async function deleteOrderNumber(number) {
  return await axios({
    method: "delete",
    url: `${urlApi}/api/pedido/${number}`,
    withCredentials: true,
    credentials: "include",
  });
}
