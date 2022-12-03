import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USERS_ADMIN,
  DATA_GET,
} from "../constants/userConstants";
import { ORDER_LIST_USER_RESET } from "../constants/orderConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    // Dispatch user login success after making the request
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Set user data to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({
    type: USER_LOGOUT,
  });

  dispatch({
    type: USER_DETAILS_RESET,
  });

  dispatch({
    type: ORDER_LIST_USER_RESET,
  });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    // Dispatch user register success after making the request
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    // Login in the user as well after registering
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Set user data to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    // Get user login and user info
    const {
      userLogin: { userInfo },
    } = getState();

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.get(`/api/users/${id}`, config);

    // Dispatch user register success after making the request
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    // Get user login and user info
    const {
      userLogin: { userInfo },
    } = getState();

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.put(`/api/users/profile`, user, config);

    // Dispatch user register success after making the request
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: USERS_ADMIN,
    });
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : [];
    // der to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.get(`/api/users/admin/users`, config);

    // Dispatch user register success after making the request
    dispatch({
      type: USERS_ADMIN,
      payload: data,
    });
  } catch (error) {}
};

export const getUsersCustomer = () => async (dispatch) => {
  try {
    dispatch({
      type: USERS_ADMIN,
    });
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : [];
    // der to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.get(`/api/users/customer`, config);

    // Dispatch user register success after making the request
    dispatch({
      type: USERS_ADMIN,
      payload: data,
    });
  } catch (error) {
    // dispatch({
    //   type: USER_DETAILS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const createUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.post(`/api/users/create`, user, config);

    // Dispatch user register success after making the request
    dispatch({
      type: DATA_GET,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DATA_GET,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DATA_GET_USER_ID",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data

    const { data } = await axios.get(`/api/users/${id}`, config);

    // Dispatch user register success after making the request
    dispatch({
      type: "DATA_GET_USER_ID",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DATA_GET,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserById = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DATA_GET,
    });

    // Get user login and user info
    const {
      userLogin: { userInfo },
    } = getState();

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    // Dispatch user register success after making the request
    dispatch({
      type: DATA_GET,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DATA_GET,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const resetData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "RESET_DATA",
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: "RESET_DATA",
      payload: {},
    });
  }
};
