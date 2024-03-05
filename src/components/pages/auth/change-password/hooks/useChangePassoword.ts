import {useNavigate} from "react-router-dom";
import useAxios from "../../../../../request/hooks/useAxios";
import {
  repeatPasswordFieldName,
  SetNewPasswordFormDataType
} from "../../SetNewPassword/SetNewPassword";
import {passwordFieldname} from "../../../../Form/FormFields/PasswordField/PasswordFieldExports";
import APIES from "../../../../../constance/apies";
import {toast} from "react-toastify";
import ROUTER_LINKS from "../../../../../constance/routerLinks";
import Ls from "../../../../../utils/customLocalStorage";
import LS_KEYS from "../../../../../constance/localStorageKeys";
import {useState} from "react";

function useChangePassoword() {

  const navigate = useNavigate()

  const [setNewPasswordResponse, setNewPasswordRequest] = useAxios()
  const [errorMessage, setErrorMessage] = useState<string>('')

  function onSubmitHandler(formData: SetNewPasswordFormDataType) {
    setErrorMessage('')

    const nationalCode = Ls.get(LS_KEYS.CHANGE_PASSWORD.NATIONAL_CODE)
    const currentPassword = Ls.get(LS_KEYS.CHANGE_PASSWORD.PASSWORD)

    const data = {
      nationalCode,
      currentPassword,
      newPassword: formData[passwordFieldname],
      newPasswordRepeated: formData[repeatPasswordFieldName]
    }

    const url = APIES.CHANGE_PASSWORD
    setNewPasswordRequest({url, method: "POST", data}).then((res) => {
      toast.success('کلمه عبور شما با موفقیت تغییر پیدا کرد')

      Ls.clearNestedLocalStorage('CHANGE_PASSWORD')

      navigate(ROUTER_LINKS.LOGIN)
    }).catch(error => {
      setErrorMessage(error.error)
    })
  }

  return {
    onSubmitHandler, loading: setNewPasswordResponse.loading, errorMessage
  }
}

export default useChangePassoword