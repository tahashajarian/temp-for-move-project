import {useMemo} from "react";
import {TdMoreProps} from "../TableBody/TdMore/TdMore";
import {TD_MORE_ACCCESSOR} from "../TableBody/TdMore/tdMoreExports";
import {useUserPermissionsContext} from "../../../../contexts/UserPermissionsContext/UserPermissionsContext";


type Props = {
  data: any;
  actions: (id:any) => TdMoreProps['list'];
  idField?: string;
}

function useGetMappedTableDataWithMoreColumn({data, actions, idField='id'}: Props) {

  const {userPermissionsResponse} = useUserPermissionsContext()

  const mappedTableData = useMemo(function () {
    const finalData = data || []

    const mappedArray = finalData.map((item:any) => ({
      ...item,
      id: item[idField],
      [TD_MORE_ACCCESSOR]: actions(item[idField])
    }))

    return mappedArray
  }, [data, userPermissionsResponse])

  return mappedTableData
}

export default useGetMappedTableDataWithMoreColumn