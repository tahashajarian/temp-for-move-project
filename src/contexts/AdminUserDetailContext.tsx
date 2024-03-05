"use client"

import {createContext, useContext} from "react";
import {ChildrenPropsType} from "../types/ChildrenPropsType";
import useAxios, {initialResponse, ResponseType} from "../request/hooks/useAxios";
import APIES from "../constance/apies";
import {useParams} from "react-router-dom";

export type UserDetailDataType = {
  "id": string,
  "nationalCode": string,
  "birthDate": string,
  "phoneNumber": string,
  "firstName": string,
  "lastName": string,
  "fatherName": string,
  "gender": number,
  "shenasnameNo": number,
  "shenasnameSeri": string,
  "shenasnameSerial": number,
  "deathStatus": number,
  "organizationId": number,
  "postName": string,
  "status": number,
  "accountExpirationDate": string,
  "twoFactorEnabled": boolean
}


type ValueType = {userDetailResponse: ResponseType, fetchUserDetail: () => void}
const initialValue = {userDetailResponse: initialResponse, fetchUserDetail: () => null}

const AdminUserDetailContext = createContext<ValueType>(initialValue)

export default function UserDetailContextProvider({children}: ChildrenPropsType) {

  const [userDetailResponse, userDetailRequest] = useAxios()
  const {userId} = useParams()

  function fetchUserDetail() {
    const params = {id: userId}
    const url = APIES.ADMIN_USERS_DETAIL
    userDetailRequest({url, params}).then()
  }

  return (
    <AdminUserDetailContext.Provider value={{userDetailResponse, fetchUserDetail}}>
      {children}
    </AdminUserDetailContext.Provider>
  );
}

export function useUserDetailContext() {
  return useContext(AdminUserDetailContext);
}