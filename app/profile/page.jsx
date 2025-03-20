"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Button from "@/components/form-controls/button";
import Input from "@/components/form-controls/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getProfile, useAuthStore } from "@/store/slice/auth";
import { useDispatch } from "react-redux";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  age: yup.number().required("Age is required"),
  mobile: yup.string().required("Mobile is required"),
  address: yup.string().required("Address is required"),
  altMobile: yup.string().required("Alternate Mobile is required"),
});
3;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const auth = useAuthStore();
  const [isEditable, setIsEditable] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("submit data", data);
    // Handle form submission
  };
  console.log("auth?.profile", auth);

  useEffect(() => {
    if (auth?.profile) {
      const { _id, name, email, age, mobile, address, altMobile } =
        auth?.profile;
      setValue("id", _id);
      setValue("name", name);
      setValue("email", email);
      setValue("age", age);
      setValue("mobile", mobile);
      setValue("address", address);
      setValue("altMobile", altMobile);
    }
  }, [auth?.profile]);

  useEffect(() => {
    auth?.profile?._id &&
      dispatch(getProfile({ params: { userId: auth?.profile?._id } }));
  }, [dispatch, auth?.profile?._id]);

  return (
    <Layout>
      <div className="flex flex-col bg-white p-6 mb-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src="/path/to/profile-image.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4 mb-4 md:mb-0"
          />
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            control={control}
            name="name"
            label="Name"
            error={errors}
            disabled={!isEditable}
          />
          <Input
            control={control}
            name="email"
            label="Email"
            error={errors}
            disabled={!isEditable}
          />
          <Input
            control={control}
            name="age"
            label="Age"
            type="number"
            error={errors}
            disabled={!isEditable}
          />
          <Input
            control={control}
            name="mobile"
            label="Mobile"
            error={errors}
            disabled={!isEditable}
          />
          <Input
            control={control}
            name="address"
            label="Address"
            error={errors}
            disabled={!isEditable}
          />
          <Input
            control={control}
            name="altMobile"
            label="Alternate Mobile"
            error={errors}
            disabled={!isEditable}
          />
          <div className="flex justify-between">
            <Button
              type="button"
              title={isEditable ? "Cancel" : "Edit Profile"}
              color="secondary"
              onClick={() => setIsEditable(!isEditable)}
            />
            {isEditable && (
              <Button type="submit" title="Save Changes" color="primary" />
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProfilePage;
