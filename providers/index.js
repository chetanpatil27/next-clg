"use client";
import { persistor, store } from "@/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }) => {
  return (
    <div>
      <Provider store={store}>
        {" "}
        <PersistGate persistor={persistor} loading={null}>
          {children}
        </PersistGate>
      </Provider>
    </div>
  );
};

export default Providers;
