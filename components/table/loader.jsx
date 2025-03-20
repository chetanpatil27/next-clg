import React from "react";
import PropTypes from "prop-types";

const Loader = ({ columnsWithSerial, length }) => {
  return (
    <>
      {Array.from({ length: length }).map((_, index) => (
        <tr
          key={index}
          className="w-full bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
        >
          {columnsWithSerial?.map((i, idx) => (
            <td key={idx} className="h-12 first:w-[10px]">
              <span className="w-full animate-pulse flex items-center h-5 bg-gray-200 dark:bg-gray-700 rounded-md opacity-70"></span>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

Loader.propTypes = {
  columnsWithSerial: PropTypes.array,
  length: PropTypes.number,
};

export default Loader;
