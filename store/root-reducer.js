import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slice/auth.js";

export const rootReducer = combineReducers({
  auth,
});
