import { createSlice } from "@reduxjs/toolkit";
import dispatchAction from "../helper/dispatch-action";
import { useSelector } from "react-redux";
const initialState = {
  token: null,
  profile: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      console.log("action.payload", action.payload);
      Object.entries(action.payload)?.forEach(([key, val]) => {
        state[key] = val;
      });
    },
    revertAuthSlice: () => {
      return initialState;
    },
  },
});

export const handleLogin =
  ({ payload }) =>
  async (dispatch) => {
    return dispatchAction({
      payload,
      method: "POST",
      endpoint: "auth/login",
      successMsg: "Login successfull",
      onSuccess: (data) => {
        console.log("data", data);
        data?.status === 200 &&
          dispatch(
            setAuthState({
              profile: data?.data?.user,
            })
          );
        return data;
      },
      showError: false,
    });
  };

export const updateProfile =
  ({ payload }) =>
  async (dispatch) => {
    return dispatchAction({
      payload,
      method: "PUT",
      endpoint: "user",
      successMsg: "Profile updated successfully",
      onSuccess: (data) => {
        console.log("data", data);
        data?.status === 200 &&
          dispatch(
            setAuthState({
              profile: data?.data?.data,
            })
          );
        return data;
      },
      showError: false,
    });
  };

export const getProfile =
  ({ params }) =>
  async (dispatch) => {
    console.log("params", params);
    return dispatchAction({
      params,
      method: "GET",
      endpoint: "profile",
      onSuccess: (data) => {
        console.log("data", data);
        data?.status === 200 &&
          dispatch(
            setAuthState({
              profile: data?.data?.data,
            })
          );
        return data;
      },
      showError: false,
      showSuccess: false,
    });
  };

export const useAuthStore = () => {
  return useSelector((state) => state.auth) || {};
};

export const { setAuthState, revertAuthSlice } = authSlice.actions;
export default authSlice.reducer;
