"use client";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "#" },
    { label: "Users", href: "/users" },
    { label: "Create User", href: "/create-user" },
  ];

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
