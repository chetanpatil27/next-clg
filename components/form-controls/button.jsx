"use client";
import classNames from "classnames";
import React from "react";

const Button = ({
  children,
  title,
  onClick,
  variant = "primary",
  className = "",
  fullSize = false,
  type = "button",
  loading,
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-500 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      className={classNames(
        "cursor-pointer",
        baseStyles,
        variants[variant],
        className,
        fullSize ? "w-full" : "w-fit"
      )}
      onClick={onClick}
    >
      {loading ? "loading....." : title}
    </button>
  );
};

export default Button;
