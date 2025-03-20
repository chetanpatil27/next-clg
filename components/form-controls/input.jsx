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
  ...rest
}) => {
  let errorMessage =
    typeof error === "object"
      ? error?.[name]?.message || ""
      : typeof error === "string"
      ? error
      : "";
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
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
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...rest}
            />
          )}
        />
      </div>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;
