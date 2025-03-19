"use client";
import React from "react";
import { Controller } from "react-hook-form";

const Input = ({
  control,
  name,
  type = "text",
  required = false,
  onChange,
  label,
  error,
  autoComplete,
}) => {
  let errorMessage =
    typeof error === "object"
      ? error?.[name]?.message || ""
      : typeof error === "string"
      ? error
      : "";
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
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
              value={field.value ?? ""}
              onChange={(e) => {
                onChange?.(e);
                field?.onChange(e);
              }}
              autoComplete={autoComplete}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          )}
        />
      </div>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;
