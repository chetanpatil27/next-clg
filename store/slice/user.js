import { createSlice } from "@reduxjs/toolkit";
import dispatchAction from "../helper/dispatch-action";
import { useSelector } from "react-redux";
const initialState = {
  registerUserLoaing: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      Object.entries(action.payload)?.forEach(([key, val]) => {
        state[key] = val;
      });
    },
    revertUserSlice: () => {
      return initialState;
    },
  },
});

export const registerUser =
  ({ payload }) =>
  async (dispatch) => {
    return dispatchAction({
      payload,
      method: "POST",
      endpoint: "auth/register",
      successMsg: "User registred successfully",
      onSuccess: (data) => {
        data?.data?.token &&
          dispatch(setUserState({ token: data?.data?.token }));
        return data;
      },
      showError: false,
      setLoading: (val) => dispatch(setUserState({ registerUserLoaing: val })),
      dispatchSetLoading: false,
    });
  };

export const useUserStore = () => {
  return useSelector((state) => state.user) || {};
};

export const { setUserState, revertUserSlice } = userSlice.actions;
export default userSlice.reducer;
