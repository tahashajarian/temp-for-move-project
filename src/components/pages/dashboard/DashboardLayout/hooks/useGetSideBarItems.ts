import {useUserPermissionsContext} from "../../../../../contexts/UserPermissionsContext/UserPermissionsContext";
import {useMemo} from "react";
import SIDEBAR_ITEMS from "../../../../../constance/dashboardLayout/sideBarItems";

function useGetSideBarItems() {

  const {userPermissionsResponse, hasPermission} = useUserPermissionsContext()

  const sideBarItems = useMemo(function () {
    return SIDEBAR_ITEMS.filter(item => hasPermission(item.permissionName))
  }, [userPermissionsResponse])

  return sideBarItems
}

export default useGetSideBarItems