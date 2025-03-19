import { createSlice } from "@reduxjs/toolkit";
import dispatchAction from "../helper/dispatch-action";
import { useSelector } from "react-redux";
const initialState = {
  token: null,
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
        data?.data?.token &&
          dispatch(setAuthState({ token: data?.data?.token }));
        return data;
      },
      showError: false,
    });
  };

export const useAuthStore = () => {
  return useSelector((state) => state.auth) || {};
};

export const { setAuthState, revertAuthSlice } = authSlice.actions;
export default authSlice.reducer;
