"use client";
import React, { useEffect, useMemo } from "react";
import AppLayout from "@/components/layout";
import Table from "@/components/table";
import { getAllUsers, useUserStore } from "@/store/slice/user";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const userS = useUserStore();
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getAllUsers({}));
  }, [dispatch]);

  return (
    <AppLayout>
      <div className="flex bg-white p-2 mb-4">
        <h1 className="text-xl">Users</h1>
      </div>
      <Table columns={columns} data={userS?.data || []} />
    </AppLayout>
  );
};

export default Page;
