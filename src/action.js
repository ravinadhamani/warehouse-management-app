import {
  ACCOUNTS_PAGE,
  DASHBOARD_PAGE,
  PRODUCT_PAGE,
  DELETE_PRODUCT_LIST,
  DELETE_CATEGORY_LIST,
  ADD_NEW_PRODUCT,
  ADD_NEW_CATEGORY,
  UPDATE_CALL_API,
  UPDATE_PROFILE,
  IS_LOGGED_IN,
  IS_LOGGED_OUT,
  DELETE_USER
} from "./constants";
import axios from "axios";
import { v4 as uuid } from "uuid";

export const allData = () => {
  return async (dispatch) => {
    await axios
      .get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
      .then((res) => {
        const user = res.data;

        dispatch(accountsPAGE(user.accountsPage));
        dispatch(productPAGE(user.productsPage));
        dispatch(dashboardPAGE(user.dasbhoardPage));
      });
  };
};



export const modifyIsLoggedIn = (data) => {
  return {
    type:IS_LOGGED_OUT,
    payload: data,

  };
};


export const modifyIsLoggedOut = (data) => {
  return {
    type:IS_LOGGED_IN,
    payload: data,
   

  };
};


export const modifyAccountInfo = (data,name) => {
  return {
    type: UPDATE_PROFILE,
    payload: data,
    name:name,

  };
};




export const modifyCallApi = (data) => {
  return {
    type: UPDATE_CALL_API,
    payload: data,
  };
};

export const modifyProductList = (data) => {
  return {
    type: DELETE_PRODUCT_LIST,
    payload: data,
  };
};

export const addNewCategory = (data) => {
  console.log(data);
  return {
    type: ADD_NEW_CATEGORY,
    payload: data,
  };
};



export const addNewProduct = (data) => {
  console.log(data);
  return {
    type: ADD_NEW_PRODUCT,
    payload: data,
  };
};

export const modifyCategoryList = (data) => {
  return {
    type: DELETE_CATEGORY_LIST,
    payload: data,
  };
};

export const accountsPAGE = (data) => {
  return {
    type: ACCOUNTS_PAGE,
    payload: data,
  };
};

export const productPAGE = (data) => {
  return {
    type: DASHBOARD_PAGE,
    payload: data,
  };
};

export const dashboardPAGE = (data) => {
  return {
    type: PRODUCT_PAGE,
    payload: data,
  };
};

export const deleteUser = (data) => {
  return {
    type:DELETE_USER,
    payload: data,

  };
};
