"use client";

import React from "react";
import TableBody from "./TableBody/TableBody";
import TableHead from "./TableHead/TableHead";
import Pagination from "../Pagination/Pagination";
import { ColumnsType, DataTableType} from "../../../types/TableType";
import OverContainerLoading from "../Loading/OverContainerLoading";

interface Props {
  data: DataTableType[];
  columns: ColumnsType[];
  countItem?: number[];
  countShowRows?: boolean;
  showNumberPages?: boolean;
  rowsPerPage?: number;
  setRowsPerPage?: (num: number) => void;
  dataLength?: number;
  currentPage?: number;
  setCurrentPage?: (num: number) => void;
  loading?: boolean;
}

const Table = ({
  data,
  columns,
  countItem,
  countShowRows,
  showNumberPages,
  rowsPerPage = data.length,
  setRowsPerPage,
  currentPage = 1,
  setCurrentPage,
  dataLength = data.length,
  loading
}: Props) => {

  const arrayCountItem = [10, 20, 30];
  // Calculate indexes of the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // Change page

  const paginate = (pageNumber: number) =>
    setCurrentPage && setCurrentPage(pageNumber);
  return (
    <div>
      <div className="relative overflow-x-auto w-full border-custom-gray-3 mb-1">
        <table className="w-full overflow-hidden">
          <TableHead columns={columns}/>
          <TableBody
            columns={columns}
            data={data}
            loading={Boolean(loading)}
          />
        </table>

        <OverContainerLoading loading={Boolean(loading)} />
      </div>
      <Pagination
        {...dataLength && {dataLength}}
        {...currentPage && {currentPage}}
        {...rowsPerPage && {rowsPerPage}}
        {...setRowsPerPage && {setRowsPerPage}}
        {...setCurrentPage && {setCurrentPage}}
        paginate={paginate}
        countShowRows={countShowRows || false}
        countItem={countItem || arrayCountItem}
        showNumberPages={showNumberPages || false}
      />
    </div>
  );
};

export default Table;
