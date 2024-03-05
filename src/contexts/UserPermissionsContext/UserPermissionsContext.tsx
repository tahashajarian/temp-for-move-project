"use client"

import {createContext, useContext, useEffect} from "react";
import {ChildrenPropsType} from "../../types/ChildrenPropsType";
import useAxios from "../../request/hooks/useAxios";
import APIES from "../../constance/apies";
import {
  PermissionsResponseType
} from "../../components/Form/FormFields/RoleNameField/utils/getMappedPermissionsFromResponse";
import hasCheckedNodeInAllNesterdChildren from "./utils/hasCheckedNodeInAllNesterdChildren";


type ValueType = {
  hasPermission: (permissionName:string) => boolean,
  userPermissionsResponse: any,
  fetchUserPermissions: () => void
}
const initialValue = {
  hasPermission: () => false,
  userPermissionsResponse: null,
  fetchUserPermissions: () => null
}

const UserPermissionsContext = createContext<ValueType>(initialValue)

export default function UserPermissionsContextProvider({children}: ChildrenPropsType) {

  const [userPermissionsResponse, userPermissionsRequest] = useAxios()

  function fetchUserPermissions() {
    const url = APIES.USER_ROLE_PERMISSIONS
    const data = {userId: null}
    userPermissionsRequest({url, method: 'POST', data}).then()
  }

  useEffect(() => {
    fetchUserPermissions()
  }, []);

  function getUserPermissions() {
    const data = userPermissionsResponse.data?.result
    if (!data) return

    const permissions: string[] = []

    function loopOnPermissions(permissionsNodes: PermissionsResponseType) {
      for (const permissionsNode of permissionsNodes) {
        const children = permissionsNode.permissions
        if (children && children?.length > 0) {
          loopOnPermissions(children)
        } else {
          permissionsNode.isGrant && permissions.push(permissionsNode.permissionName)
        }
      }
    }

    loopOnPermissions(data)

    function addParentPermissions(permissionsNodes: PermissionsResponseType) {
      for (const permissionsNode of permissionsNodes) {
        const children = permissionsNode.permissions
        if (children && children?.length > 0) {
          const hasChecked = hasCheckedNodeInAllNesterdChildren({checked: permissions, node: permissionsNode})
          hasChecked && permissions.push(permissionsNode.permissionName)
          addParentPermissions(children)
        }
      }
    }

    addParentPermissions(data)

    return permissions
  }

  function hasPermission(permissionName:string) {
    const userPermissions = getUserPermissions()
    return Boolean(userPermissions?.includes(permissionName))
  }

  return (
    <UserPermissionsContext.Provider value={{
      hasPermission,
      userPermissionsResponse,
      fetchUserPermissions
    }}>
      {children}
    </UserPermissionsContext.Provider>
  );
}

export function useUserPermissionsContext() {
  return useContext(UserPermissionsContext);
}
