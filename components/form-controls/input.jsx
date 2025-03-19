"use client";
import React from "react";
import { Controller } from "react-hook-form";

const Input = ({
  control,
  name,
  type = "text",
  required = false,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        Email address
      </label>
      <div className="mt-2">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={field.name}
              type={type}
              required={required}
              onChange={(e) => {
                onChange?.(e);
                field?.onChange(e);
              }}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          )}
        />
      </div>
    </div>
  );
};

export default Input;
