import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import classNames from "classnames";
// import Checkbox from "@components/ui/Checkbox";
import { useDispatch } from "react-redux";
import Loader from "./loader";

const Table = ({
  data,
  columns,
  onRowClick,
  onRowRightClick,
  onRowKeyDown,
  focuseble = false,
  rowSelectOnChange,
  selectedRows,
  stickyHeader = false,
  loading = false,
  canSelect = false,
}) => {
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState();
  useEffect(() => {
    const parentDiv = document.querySelector(".wrapper");

    if (parentDiv?.classList.contains("wrapper")) {
      parentDiv.style.backgroundColor = "#fafbfd";
    }
  }, []);
  const selectedRowOnChange = (e, type, row) => {
    rowSelectOnChange?.(e, type, row);
  };
  const columnsWithSrNo = React.useMemo(
    () => [
      // ...(canSelect
      //   ? [
      //       {
      //         id: "selection",
      //         header: () => (
      //           <Checkbox
      //             name="rowselection"
      //             value={Object.keys(selectedRows).length === data.length}
      //             onChange={(e) => selectedRowOnChange(e, "ALL")}
      //           />
      //         ),
      //         cell: ({ row }) => (
      //           <Checkbox
      //             name="rowselection"
      //             value={!!selectedRows[row?.original?.id]}
      //             onChange={(e) =>
      //               selectedRowOnChange(e, "SINGLE", row?.original)
      //             }
      //           />
      //         ),
      //         enableSorting: false,
      //         meta: { style: { width: "50px" } },
      //       },
      //     ]
      //   : []),
      {
        id: "#",
        header: "#",
        cell: (info) => info.row.index + 1,
        meta: { style: { width: "50px" } },
        enableSorting: false,
      },
      ...columns,
    ],
    [columns, data, selectedRows, dispatch]
  );

  const table = useReactTable({
    data,
    columns: columnsWithSrNo,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className=" bg-white p-4">
      <table className={classNames("table-auto w-full")}>
        <thead className={classNames(stickyHeader && "sticky z-10 top-0")}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-50 border-b">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-4 py-2 cursor-pointer"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <span>
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={classNames(
                "hover:bg-gray-50 border-b  border-gray-300",
                {
                  "custom-focus": focuseble,
                }
              )}
              id={`tr_${index}`}
              role={focuseble ? "button" : "listitem"}
              onClick={(e) => {
                e.preventDefault();
                focuseble && onRowClick?.(e, row);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                focuseble && onRowRightClick?.(e, row);
              }}
              onKeyDown={(e) => {
                focuseble && onRowKeyDown?.(e, row);
              }}
              tabIndex={focuseble ? 0 : -1}
            >
              {row.getVisibleCells().map((cell) => {
                const columnMeta = cell.column.columnDef.meta || {};
                return (
                  <td
                    key={cell.id}
                    className={classNames("px-4 py-2", columnMeta?.className)}
                    style={columnMeta?.style || {}}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
          {loading && <Loader columnsWithSerial={columnsWithSrNo} length={6} />}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  onRowClick: PropTypes.func,
  onRowRightClick: PropTypes.func,
  onRowKeyDown: PropTypes.func,
  rowSelectOnChange: PropTypes.func,
  focuseble: PropTypes.bool,
  stickyHeader: PropTypes.bool,
  selectedRows: PropTypes.object,
  loading: PropTypes.bool,
  canSelect: PropTypes.bool,
  type: PropTypes.string,
};

export default Table;
