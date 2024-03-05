import {SideBarItemType} from "../../../../../constance/dashboardLayout/sideBarItems";
import {useMemo} from "react";
import {useUserPermissionsContext} from "../../../../../contexts/UserPermissionsContext/UserPermissionsContext";

type Props = {
  subMenus: SideBarItemType['subMenu']
}

function useGetSubMenus({subMenus}: Props) {

  const {hasPermission, userPermissionsResponse} = useUserPermissionsContext()

  const filteredSubMenus = useMemo(function () {
    return subMenus.filter(item => hasPermission(item.permissionName))
  }, [subMenus, userPermissionsResponse])

  return filteredSubMenus
}

export default useGetSubMenus