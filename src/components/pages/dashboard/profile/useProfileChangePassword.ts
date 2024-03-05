import useAxios from "../../../../request/hooks/useAxios";
import {useState} from "react";
import useReactHookFormWrapper from "../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import APIES from "../../../../constance/apies";
import {getResponseSuccess} from "../../../../request/utils/getResponse";
import {
  repeatPasswordFieldName,
  SetNewPasswordFormDataType
} from "../../auth/SetNewPassword/SetNewPassword";
import {passwordFieldname} from "../../../Form/FormFields/PasswordField/PasswordFieldExports";
import useDisplayWithAnimation from "../../../others/DisplayWithAnimation/hooks/useDisplayWithAnimation";

type Props = {
  onCloseChangePass: () => void;
};

function useProfileChangePassword({onCloseChangePass}: Props) {
  const [changePasswordResponse, changePasswordRequest] = useAxios();
  const [changePasswordModalAdminUserId, setChangePasswordModalAdminUserId] =
    useState<string>("");
  const {shouldBeRemoved: changePasswordModalShouldBeRemoved} =
    useDisplayWithAnimation({show: Boolean(changePasswordModalAdminUserId)});

  const {formMethods, onSubmit} = useReactHookFormWrapper({
    onSubmitHandler,
  });

  const {reset} = formMethods;

  function onSubmitHandler(formData: SetNewPasswordFormDataType) {
    const data = {
      newPassword: formData[passwordFieldname],
      repetedPassword: formData[repeatPasswordFieldName],
    };

    const url = APIES.PROFILE_CHANGE_PASSWROD;

    changePasswordRequest({url, method: "POST", data}).then(async (res) => {
      const {toast} = await import("react-toastify");
      reset();
      toast.success(getResponseSuccess(res));
      onCloseChangePass();
    });
  }

  return {
    changePasswordFormMethods: formMethods,
    changePasswordOnSubmit: onSubmit,
    changePasswordModalAdminUserId,
    changePasswordLoading: changePasswordResponse.loading,
    setChangePasswordModalAdminUserId,
    changePasswordModalShouldBeRemoved,
  };
}

export default useProfileChangePassword;
