"use client";
import Button from "@/components/form-controls/button";
import Input from "@/components/form-controls/input";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser, useUserStore } from "@/store/slice/user";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

const RegisterUserForm = () => {
  const userS = useUserStore();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log("submit data", data);
    const res = await dispatch(registerUser({ payload: data }));
    console.log("res", res);
    if (res?.status === 400) {
      toast.error(res?.message);
    } else if (res?.status === 201) {
      reset();
    }
  };
  return (
    <div className="bg-white p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input control={control} name="name" label="Name" error={errors} />
        <Input control={control} name="email" label="Email" error={errors} />
        <Input
          control={control}
          name="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          error={errors}
        />

        <Button
          type="submit"
          title="Register"
          color="primary"
          fullSize
          loading={userS?.registerUserLoaing}
        />
      </form>
    </div>
  );
};

export default RegisterUserForm;
