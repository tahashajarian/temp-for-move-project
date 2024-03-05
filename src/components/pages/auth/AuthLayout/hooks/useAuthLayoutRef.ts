import {useRef} from "react";
import {AuthLayoutRefType} from "../AuthLayout";

function useAuthLayoutRef() {

  const authLayoutRef = useRef<AuthLayoutRefType>(null)

  return authLayoutRef
}

export default useAuthLayoutRef