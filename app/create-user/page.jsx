import React from "react";

import AppLayout from "@/components/layout";
import RegisterUserForm from "@/forms/register-user";
const page = () => {
  return (
    <>
      <AppLayout>
        <div className="flex bg-white p-2 mb-4">
          <h1 className="text-xl">Create user</h1>
        </div>
        <RegisterUserForm />
      </AppLayout>
    </>
  );
};

export default page;
