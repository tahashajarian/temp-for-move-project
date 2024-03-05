import CheckBoxForm from "../../CheckBox/CheckBoxForm";
import {
  loginWithTwoFactorPasswordFieldName, loginWithTwoFactorPasswordLabel
} from "./LoginWithTwoFactorPasswordFieldExports";

function LoginWithTwoFactorPasswordField({}) {

  return (
    <CheckBoxForm
      fieldName={loginWithTwoFactorPasswordFieldName}
      inputProps={{
        text: loginWithTwoFactorPasswordLabel,
      }}
    />
  )
}

export default LoginWithTwoFactorPasswordField