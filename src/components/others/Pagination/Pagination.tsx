import React, {FC, useState, useEffect} from "react";
import ArrowIcon from "../../svg/ArrowIcon";

interface Props {
  dataLength?: number;
  currentPage?: number;
  rowsPerPage?: number;
  countItem: number[];
  countShowRows: boolean;
  showNumberPages: boolean;
  setCurrentPage?: (page: any) => void;
  setRowsPerPage?: (rows: number) => void;
  paginate: (pageNumber: number) => void;
}

const Pagination: FC<Props> = (
  {
    dataLength = 0,
    currentPage,
    rowsPerPage,
    countItem,
    setCurrentPage,
    setRowsPerPage,
    paginate,
    countShowRows,
    showNumberPages,
  }
) => {
  const [minValueArrShowRowInList, setMinValueArrShowRowInList] =
    useState<number>(0);
  const goToPreviousPage = () => {
    setCurrentPage && setCurrentPage((prevPage: number) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage && setCurrentPage((prevPage: number) => prevPage + 1);
  };

  function findMinValue(arr: number[]) {
    let minValue = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
        minValue = arr[i];
      }
    }

    return minValue;
  }

  useEffect(() => {
    setMinValueArrShowRowInList(findMinValue(countItem));
  }, [countItem])

  const displayConditionOfRowsPerPage = !showNumberPages || !countShowRows || dataLength < minValueArrShowRowInList || !dataLength
  const displayConditionOfPagination = !showNumberPages || !dataLength || !rowsPerPage || dataLength <= rowsPerPage

  return displayConditionOfPagination && displayConditionOfRowsPerPage ? <></> : (
    <div className="ml-2 my-3 flex w-full justify-between items-center px-4">
      {displayConditionOfRowsPerPage ? (
        <></>
      ) : (
        <div className='flex items-center'>
          <span className="ml-3 content-center grid grid-cols-1">
            تعداد نمایش ردیف در صفحه
          </span>
          <div className='relative'>
            <select
              className="px-3 border rounded-lg bg-white w-20 appearance-none h-10"
              value={rowsPerPage}
              onChange={(e: any) => {
                setRowsPerPage && setRowsPerPage(Number(e.target.value))
              }}
            >
              <div className=""></div>
              {countItem.map((option) => (
                <option key={option} value={option} className='p-2 h-10'>
                  {option}
                </option>
              ))}
            </select>

            <div
              className="absolute inset-y-0 my-auto left-2 w-0 h-0 border-l-[5px] border-l-transparent border-t-[7px] border-t-gray-600 border-r-[5px] border-r-transparent"
            >
            </div>
          </div>
        </div>
      )}
      {displayConditionOfPagination ? (
        <></>
      ) : (
        <div className="flex justify-center mx-4">
          <span className="ml-3 content-center grid grid-cols-1">
            شماره صفحه
          </span>

          <ul className="pagination flex">
            <li>
              <button
                className="mx-2 h-10 w-10 grid content-center text-center rounded-xl cursor-pointer border hover:bg-primary-50"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ArrowIcon className='-rotate-90 mx-auto'/>
              </button>
            </li>
            {Array(Math.ceil(dataLength / rowsPerPage))
              .fill(null)
              .map((_, index) => {
                if (!currentPage) return;

                if (
                  index === 0 ||
                  index === Math.ceil(dataLength / rowsPerPage) - 1 ||
                  (index >= currentPage - 2 && index <= currentPage)
                ) {
                  return (
                    <li
                      key={index}
                      className={`mx-2 h-10 w-10 grid content-center text-center rounded-xl cursor-pointer ${
                        index + 1 === currentPage
                          ? "bg-primary text-white"
                          : "border hover:bg-primary-50"
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </li>
                  );
                } else if (
                  index === currentPage - 3 ||
                  index === currentPage + 1
                ) {
                  return (
                    <li
                      key={index}
                      className="mx-2 h-10 w-10 grid content-center text-center rounded-xl cursor-pointer"
                    >
                      ...
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            <li>
              <button
                className="mx-2 h-10 w-10 grid content-center text-center rounded-xl cursor-pointer border hover:bg-primary-50"
                onClick={goToNextPage}
                disabled={currentPage === Math.ceil(dataLength / rowsPerPage)}
              >
                <ArrowIcon className='rotate-90 mx-auto'/>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
};
export default Pagination;
