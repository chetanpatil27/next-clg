"use client";
import React from "react";
import Input from "@/components/form-controls/input";
import { useForm } from "react-hook-form";
import Button from "@/components/form-controls/button";

const page = () => {
  const { control } = useForm();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <Input control={control} name="email" />
            <Input control={control} name="password" type="password" />

            <Button title="Sign In" color="primary" fullSize />
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
