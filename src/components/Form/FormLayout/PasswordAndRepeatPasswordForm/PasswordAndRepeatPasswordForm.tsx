import PasswordField from "../../FormFields/PasswordField/PasswordField";
import Button from "../../Button/Button";
import PasswordValidationRows from "../../../pages/auth/PasswordValidationRows";
import {repeatPasswordFieldName} from "../../../pages/auth/SetNewPassword/SetNewPassword";
import {passwordFieldname} from "../../FormFields/PasswordField/PasswordFieldExports";


type Props = {
  buttonDisabled?: boolean;
  loading?: boolean;
  hasGenerateRandomPasswordButton?: boolean;
}

function PasswordAndRepeatPasswordForm({buttonDisabled, loading, hasGenerateRandomPasswordButton}: Props) {

  function repeatNewPasswordValidation(value:any, watch:any) {
    if (watch(passwordFieldname).trim() == value.trim()) return true;

    return "مقدار وارد شده باید با کلمه عبور جدید برابر باشد";
  }


  return (
    <>
      <PasswordField hasValidations hasGenerateRandomPasswordButton={hasGenerateRandomPasswordButton}/>

      <PasswordField
        fieldNameFromProps={repeatPasswordFieldName} labelFromProps='تکرار کلمه عبور'
        validate={repeatNewPasswordValidation}
      />

      <Button
        className={{extra: 'my-2'}} type='submit'
        {...buttonDisabled && {disabled: buttonDisabled}}
        {...loading && {loading}}
      >
        ثبت
      </Button>

      <PasswordValidationRows/>
    </>
  )
}

export default PasswordAndRepeatPasswordForm