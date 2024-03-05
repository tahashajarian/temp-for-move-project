import {useNavigate} from "react-router-dom";
import useAxios from "../../../../../request/hooks/useAxios";
import ROUTER_LINKS from "../../../../../constance/routerLinks";
import {
  nationalCodeFieldName
} from "../../../../Form/FormFields/NationalCodeField/NationalCodeFieldExports";
import APIES from "../../../../../constance/apies";
import {useEffect, useState} from "react";
import Ls from "../../../../../utils/customLocalStorage";
import LS_KEYS from "../../../../../constance/localStorageKeys";
import useReactHookFormWrapper from "../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";


type FormDataType = {
  [nationalCodeFieldName]: string;
};

function useForgetPassword() {
  const {formMethods, onSubmit} = useReactHookFormWrapper({
    onSubmitHandler,
  })

  const navigate = useNavigate()

  const [forgetPasswordRes, forgetPasswordRequest] = useAxios()

  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(function () {
    const nationalCode = Ls.get(LS_KEYS.FORGET_PASSWORD.NATIONAL_CODE)

    setTimeout(function () {
      if (!nationalCode) return
      formMethods.setValue(nationalCodeFieldName, nationalCode)
    }, 300)
  }, [])

  function onSubmitHandler(formData: FormDataType) {
    setErrorMessage('')

    const data = {
      "nationalCode": formData[nationalCodeFieldName],
    }

    const url = APIES.FORGET_PASSWORD
    forgetPasswordRequest({
      url, method: "POST", data, disabledThrowErrorToast: true, addCloudFlareCode: true
    }).then((res) => {
      Ls.add(LS_KEYS.FORGET_PASSWORD.NATIONAL_CODE, formData[nationalCodeFieldName])
      Ls.add(LS_KEYS.FORGET_PASSWORD_OTP.MOBILE, res?.data?.result)
      navigate(ROUTER_LINKS.FORGET_PASSWORD_OTP)
    }).catch(error => {
      setErrorMessage(error.error)
    })
  }

  return {
    loading: forgetPasswordRes?.loading, formMethods, onSubmit, errorMessage
  }
}

export default useForgetPassword