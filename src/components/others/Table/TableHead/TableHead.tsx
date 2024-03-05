"use client";

import React, { FC } from "react";
import { ColumnsType} from "../../../../types/TableType";

interface Props {
  columns: ColumnsType[];
}

const TableHead: FC<Props> = ({ columns }) => {
  return (
    <thead>
      <tr className="h-9 bg-gray-50 border-b border-t border-gray-300">
        {columns.map(({ label, accessor }, index) => {
          return (
            <th key={accessor} className={`h-full`}>
              <div
                className={`px-4 py-2 w-full font-normal text-sm whitespace-nowrap text-right text-gray-500`}
              >
                {label}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
