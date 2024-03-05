import {createContext, useContext, useState} from "react";
import {ChildrenPropsType} from "../types/ChildrenPropsType";
import {SetStateType} from "../types/SetStateType";


type ValueType = {cloudFlareCode: string, setCloudFlareCode: SetStateType<string>}
const initialValue = {cloudFlareCode: '', setCloudFlareCode: () => null}

const AdminCloudFlareCaptchaContext = createContext<ValueType>(initialValue)

export default function CloudFlareCaptchaContextProvider({children}: ChildrenPropsType) {

  const [cloudFlareCode, setCloudFlareCode] = useState('')


  return (
    <AdminCloudFlareCaptchaContext.Provider value={{cloudFlareCode, setCloudFlareCode}}>
      {children}
    </AdminCloudFlareCaptchaContext.Provider>
  );
}

export function useCloudFlareCaptchaContext() {
  return useContext(AdminCloudFlareCaptchaContext);
}