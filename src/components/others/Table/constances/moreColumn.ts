import {TD_MORE_ACCCESSOR} from "../TableBody/TdMore/tdMoreExports";
import RENDER_TYPES from "../../../../constance/table/renderTypes";
import {ColumnsType} from "../../../../types/TableType";

const MORE_COLUMN:ColumnsType = {
  label: "",
  accessor: TD_MORE_ACCCESSOR,
  renderType: RENDER_TYPES.MORE,
  tdWidth: 'w-[60px]'
}

export default MORE_COLUMN