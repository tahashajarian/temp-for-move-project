import React, { FC } from "react";
import {
  ColumnsRenderTypes,
  ColumnsType,
  DataTableType
} from "../../../../types/TableType";
import RENDER_TYPES from "../../../../constance/table/renderTypes";
import TdStatus from "./TdStatus";
import TdMore from "./TdMore/TdMore";
import TdDate from "./TdDate";
import TdExpire from "./TdExpire";

interface PropsTd {
  tdData: any;
  renderType?: ColumnsRenderTypes;
  data?: any;
}

const TableTd: FC<PropsTd> = ({ tdData, renderType, data }) => {
  const rendersObject: any = {
    [RENDER_TYPES.STATUS]: <TdStatus status={data["status"]} />,
    [RENDER_TYPES.MORE]: <TdMore list={tdData} />,
    [RENDER_TYPES.DATE]: <TdDate date={tdData} />,
    [RENDER_TYPES.HASEXPIREDATE]: <TdExpire data={tdData} />,

    default: <span className="text-sm">{tdData}</span>,
  }

  return rendersObject[renderType || "default"];
};

interface Props {
  data: DataTableType[];
  columns: ColumnsType[];
  loading?: boolean;
}

const TableBody: FC<Props> = ({ data, columns, loading }) => {
  if (data?.length == 0 || !data) {
    return (
      <tfoot className="  text-gray-900 font-normal ">
        <tr className="">
          <td
            colSpan={columns.length + 2}
            className="text-center py-20 text-base"
          >
            {loading ? "در حال دریافت اطلاعات" : "هیچ داده ای وجود ندارد"}
          </td>
        </tr>
      </tfoot>
    );
  }
  return (
    <tbody className="bg-white overflow-x-auto">
      {data?.map((row, index) => (
        <tr
          key={row.id}
          className={`${
            index === data.length - 1 ? "" : "border-b"
          } border-custom-gray-3`}
        >
          {columns.map(({ accessor, renderType, tdWidth }, index) => {
            const tdData =
              row[accessor] == null || row[accessor] === ""
                ? "-"
                : row[accessor];

            return (
              <td key={accessor} className={`p-4 ${tdWidth}`}>
                <div className="flex text-base font-normal text-gray-700 text-right">
                  <TableTd
                    {...(renderType && { renderType })}
                    tdData={tdData}
                    data={row}
                  />
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
