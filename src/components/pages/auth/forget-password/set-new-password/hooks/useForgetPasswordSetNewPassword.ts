import ROUTER_LINKS from "../../../../../../constance/routerLinks";
import {passwordFieldname} from "../../../../../Form/FormFields/PasswordField/PasswordFieldExports";
import {toast} from "react-toastify";
import APIES from "../../../../../../constance/apies";
import {
  repeatPasswordFieldName,
  SetNewPasswordFormDataType
} from "../../../SetNewPassword/SetNewPassword";
import {useNavigate} from "react-router-dom";
import useAxios from "../../../../../../request/hooks/useAxios";
import Ls from "../../../../../../utils/customLocalStorage";
import LS_KEYS from "../../../../../../constance/localStorageKeys";
import {useState} from "react";


function useForgetPasswordSetNewPassword() {

  const navigate = useNavigate()

  const [setNewPasswordResponse, setNewPasswordRequest] = useAxios()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const nationalCode = Ls.get(LS_KEYS.FORGET_PASSWORD.NATIONAL_CODE)
  const token = Ls.get(LS_KEYS.FORGET_PASSWORD_SET_NEW_PASSWORD.TOKEN)

  function onSubmitHandler(formData: SetNewPasswordFormDataType) {
    setErrorMessage('')

    const data = {
      nationalCode: nationalCode,
      token: token,
      newPassword: formData[passwordFieldname],
      repeatPassword: formData[repeatPasswordFieldName]
    }

    const url = APIES.SMS_RESET_PASSWORD
    setNewPasswordRequest({url, method: "POST", data}).then((res) => {
      toast.success('کلمه عبور شما با موفقیت تغییر پیدا کرد')

      Ls.clearNestedLocalStorage('FORGET_PASSWORD')
      Ls.clearNestedLocalStorage('FORGET_PASSWORD_OTP')
      Ls.clearNestedLocalStorage('FORGET_PASSWORD_SET_NEW_PASSWORD')

      navigate(ROUTER_LINKS.LOGIN)
    }).catch(error => {
      setErrorMessage(error.error)
    })
  }

  return {
    onSubmitHandler, loading: setNewPasswordResponse.loading, errorMessage
  }
}

export default useForgetPasswordSetNewPassword
