import useAxios from "../../../../../../../request/hooks/useAxios";
import {useState} from "react";
import useReactHookFormWrapper
  from "../../../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import APIES from "../../../../../../../constance/apies";
import {getResponseSuccess} from "../../../../../../../request/utils/getResponse";
import {
  repeatPasswordFieldName,
  SetNewPasswordFormDataType
} from "../../../../../auth/SetNewPassword/SetNewPassword";
import {passwordFieldname} from "../../../../../../Form/FormFields/PasswordField/PasswordFieldExports";
import useDisplayWithAnimation from "../../../../../../others/DisplayWithAnimation/hooks/useDisplayWithAnimation";

function useAdminUserChangePassword() {

  const [changePasswordResponse, changePasswordRequest] = useAxios()
  const [changePasswordModalAdminUserId, setChangePasswordModalAdminUserId] = useState<string>('')
  const {shouldBeRemoved: changePasswordModalShouldBeRemoved} = useDisplayWithAnimation({show: Boolean(changePasswordModalAdminUserId)})

  const {formMethods, onSubmit} = useReactHookFormWrapper({
    onSubmitHandler,
  })

  const {reset} = formMethods

  function onSubmitHandler(formData: SetNewPasswordFormDataType) {
    const data = {
      userId: changePasswordModalAdminUserId,
      newPassword: formData[passwordFieldname],
      repetedPassword: formData[repeatPasswordFieldName]
    }

    const url = APIES.ADMIN_USERS_CHANGE_PASSWORD

    changePasswordRequest({url, method: 'POST', data}).then(async (res) => {
      const {toast} = await import("react-toastify")
      closeChangePasswordModal()
      toast.success(getResponseSuccess(res))
    })
  }

  function closeChangePasswordModal() {
    reset()
    setChangePasswordModalAdminUserId('')
  }

  return {
    changePasswordFormMethods: formMethods, changePasswordOnSubmit: onSubmit, changePasswordModalAdminUserId,
    changePasswordLoading: changePasswordResponse.loading, setChangePasswordModalAdminUserId, closeChangePasswordModal,
    changePasswordModalShouldBeRemoved
  }
}

export default useAdminUserChangePassword