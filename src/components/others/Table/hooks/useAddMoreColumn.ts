import {TD_MORE_ACCCESSOR} from "../TableBody/TdMore/tdMoreExports";
import MORE_COLUMN from "../constances/moreColumn";
import {ColumnsType} from "../../../../types/TableType";


type Props = {
  tableData: any[];
  columns: ColumnsType[];
}

function useAddMoreColumn({tableData, columns}: Props):ColumnsType[] {

  const actions = tableData[0] ? tableData[0][TD_MORE_ACCCESSOR] : []
  const mappedColumns = [...columns, ...(actions && actions?.length > 0) ? [MORE_COLUMN] : []]

  return mappedColumns || []
}

export default useAddMoreColumn