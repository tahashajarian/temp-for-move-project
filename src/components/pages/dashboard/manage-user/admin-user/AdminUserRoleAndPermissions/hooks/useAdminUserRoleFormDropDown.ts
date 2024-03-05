import {useEffect, useState} from "react";
import {
  RoleObjectType
} from "../AdminUserRoleFormDropDownExports";
import APIES from "../../../../../../../constance/apies";
import useAxios from "../../../../../../../request/hooks/useAxios";
import {getResponseSuccess} from "../../../../../../../request/utils/getResponse";
import {useParams} from "react-router-dom";

type Props = {
  userRoles: RoleObjectType[];
  updateRoleAndPermissions: () => void;
}

function useAdminUserRoleFormDropDown({userRoles, updateRoleAndPermissions}: Props) {

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
  const [activeRoleList, setActiveRoleList] = useState<RoleObjectType[]>(userRoles)
  const [updateRoleResponse, updateRoleRequest] = useAxios()
  const {userId} = useParams()

  useEffect(() => {
    setActiveRoleList(userRoles)
  }, [userRoles]);

  function onCheck(role: RoleObjectType) {
    const isExists = Boolean(activeRoleList.find(item => item.id === role.id))

    if (isExists) {
      setActiveRoleList(prev => prev.filter(item => item.id !== role.id))
    } else {
      setActiveRoleList(prev => [...prev, role])
    }
  }

  function saveChanges() {
    const url = APIES.ADMIN_USERS_USER_UPDATE_ROLES
    const data = {
      id: userId,
      roles: activeRoleList.map(item => item.id)
    }
    updateRoleRequest({url, method: "POST", data}).then(async (response) => {
      const {toast} = await import("react-toastify")
      toast.success(getResponseSuccess(response))
      setDropDownOpen(false)
      updateRoleAndPermissions()
    })
  }

  useEffect(() => {
    if (dropDownOpen) return
    setActiveRoleList(userRoles)
  }, [dropDownOpen]);

  return {
    activeRoleList, onCheck, saveChanges, updateRoleListLoading: updateRoleResponse.loading,
    dropDownOpen, setDropDownOpen
  }
}

export default useAdminUserRoleFormDropDown