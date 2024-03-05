"use client"

import {createContext, useContext, useEffect} from "react";
import {ChildrenPropsType} from "../types/ChildrenPropsType";
import useAxios from "../request/hooks/useAxios";
import APIES from "../constance/apies";


type ValueType = {permissionsResponse: any, fetchPermissions: () => void}
const initialValue = {permissionsResponse: null, fetchPermissions: () => null}

const PermissionsContext = createContext<ValueType>(initialValue)

export default function PermissionsContextProvider({children}: ChildrenPropsType) {

  const [permissionsResponse, permissionsRequest] = useAxios()

  function fetchPermissions() {
    if (permissionsResponse.data) return
    const url = APIES.ROLE_PERMISSIONS
    permissionsRequest({url, method: 'POST'}).then()
  }

  return (
    <PermissionsContext.Provider value={{permissionsResponse, fetchPermissions}}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissionsContext() {
  return useContext(PermissionsContext);
}
