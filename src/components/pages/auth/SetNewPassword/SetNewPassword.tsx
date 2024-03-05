
import AuthLayout from "../AuthLayout/AuthLayout";
import {passwordFieldname} from "../../../Form/FormFields/PasswordField/PasswordFieldExports";
import useReactHookFormWrapper from "../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import PasswordAndRepeatPasswordForm
  from "../../../Form/FormLayout/PasswordAndRepeatPasswordForm/PasswordAndRepeatPasswordForm";


export const repeatPasswordFieldName = 'repeatPassword'

export type SetNewPasswordFormDataType = {
  [passwordFieldname]: string;
  [repeatPasswordFieldName]: string;
};

type Props = {
  onSubmitHandler: (data:SetNewPasswordFormDataType) => void
  buttonDisabled: boolean
  title?: string
  errorMessage?: string
}

function SetNewPassword({onSubmitHandler, buttonDisabled, title, errorMessage}: Props) {

  const { formMethods, onSubmit } = useReactHookFormWrapper({
    onSubmitHandler,
  })

  return (
    <AuthLayout
      onSubmit={onSubmit} formMethods={formMethods} backLink errorMessage={errorMessage}
      title={title || 'تعیین کلمه عبور'} subTitle='برای ورود به پنل  مدیریت سامانه جامع تجارت کد ملی  و کلمه عبور خود را وارد کنید'
    >
      <PasswordAndRepeatPasswordForm buttonDisabled={buttonDisabled}/>
    </AuthLayout>
  )
}

export default SetNewPassword