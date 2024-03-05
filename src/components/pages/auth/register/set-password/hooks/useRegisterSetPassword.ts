import {useNavigate} from "react-router-dom";
import useAxios from "../../../../../../request/hooks/useAxios";
import {
  repeatPasswordFieldName,
  SetNewPasswordFormDataType
} from "../../../SetNewPassword/SetNewPassword";
import {passwordFieldname} from "../../../../../Form/FormFields/PasswordField/PasswordFieldExports";
import APIES from "../../../../../../constance/apies";
import ROUTER_LINKS from "../../../../../../constance/routerLinks";
import Ls from "../../../../../../utils/customLocalStorage";
import LS_KEYS from "../../../../../../constance/localStorageKeys";
import {
  loginWithTwoFactorPasswordFieldName
} from "../../../../../Form/FormFields/LoginWithTwoFactorPasswordField/LoginWithTwoFactorPasswordFieldExports";
import getUrlWithParams from "../../../../../../utils/getUrlWithParams";
import QUERY_PARAMS from "../../../../../../constance/queryParams";
import {useState} from "react";

function useRegisterSetPassword() {

  const navigate = useNavigate()

  const [setNewPasswordResponse, setNewPasswordRequest] = useAxios()
  const [errorMessage, setErrorMessage] = useState<string>('')

  function onSubmitHandler(formData: SetNewPasswordFormDataType) {
    setErrorMessage('')

    const registerFormData = Ls.get(LS_KEYS.REGISTER)
    const data = {
      trackId: Ls.get(LS_KEYS.REGISTER_OTP.TRACK_ID),
      twoFactorEnabled: registerFormData[loginWithTwoFactorPasswordFieldName],
      password: formData[passwordFieldname],
      confirmPassword: formData[repeatPasswordFieldName]
    }

    const url = APIES.REGISTER_SET_PASSWORD
    setNewPasswordRequest({url, method: "POST", data}).then((res) => {
      Ls.remove(LS_KEYS.REGISTER)
      Ls.clearNestedLocalStorage('REGISTER_OTP')

      Ls.add(LS_KEYS.LOGIN.SUCCESSFUL_MESSAGE_AFTER_REGISTER, res?.data?.result?.value || '')
      const params = {
        [QUERY_PARAMS.SHOW_SUCCESSFUL_REGISTRATION]: 'true'
      }
      const url = getUrlWithParams(ROUTER_LINKS.LOGIN, params)
      navigate(url)
    }).catch(error => {
      setErrorMessage(error.error)
    })
  }

  return {
    onSubmitHandler, loading: setNewPasswordResponse.loading, errorMessage
  }
}

export default useRegisterSetPassword