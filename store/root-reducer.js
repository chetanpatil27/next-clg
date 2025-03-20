import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slice/auth.js";
import user from "./slice/user.js";

export const rootReducer = combineReducers({
  auth,
  user,
});
