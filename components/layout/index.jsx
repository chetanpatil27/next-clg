"use client";
import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Header />
        <main className="flex-1 p-4 mt-2 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
