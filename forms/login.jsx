"use client";
import Button from "@/components/form-controls/button";
import Input from "@/components/form-controls/input";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { handleLogin, useAuthStore } from "@/store/slice/auth";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const authS = useAuthStore();
  console.log("authS", authS);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log("submit data", data);
    const res = await dispatch(handleLogin({ payload: data }));
    console.log("res", res);
    if (res?.status === 401) {
      toast.error(res?.message);
    } else if (res?.data?.data?.status === 200) {
      console.log("at reload");
      window.location.reload();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  gap-4">
        <Input
          control={control}
          name="email"
          label="User name"
          error={errors}
        />
        <Input
          control={control}
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          error={errors}
        />

        <Button type="submit" title="Sign In" color="primary" fullSize />
      </form>
    </>
  );
};

export default LoginForm;
