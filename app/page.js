import AppLayout from "@/components/layout";
import Sidebar from "@/components/layout/sidebar";
import React from "react";
export default function Home() {
  return (
    <>
      <AppLayout>
        <div className="flex-1 flex items-center justify-center border border-red-500">
          <h1 className="text-3xl">Welcome to Home Page</h1>
        </div>
      </AppLayout>
    </>
  );
}
