import Button from "../../Form/Button/Button";
import PasswordField from "../../Form/FormFields/PasswordField/PasswordField";
import PasswordValidationRows from "../../pages/auth/PasswordValidationRows";
import React from "react";
import GenerateNewPassword from "../GetnerateNewPassword/GenerateNewPassword";

type Props = {
  passwordFieldname: string;
  repeatPasswordFieldName: string;
  buttonDisabled: boolean;
  loading?: boolean;
  generateButtonAction?: (pass: string) => void;
};

const SetPasswordForm = (props: Props) => {
  function repeatNewPasswordValidation(value: any, watch: any) {
    if (watch(props.passwordFieldname).trim() == value.trim()) return true;

    return "مقدار وارد شده باید با کلمه عبور جدید برابر باشد";
  }
  return (
    <div>
      {props.generateButtonAction && (
        <div className="text-left absolute left-5 ">
          <GenerateNewPassword
            passwordLength={12}
            setPassword={props.generateButtonAction}
            useLowerCase={true}
            useNumbers={true}
            useSymbols={true}
            useUpperCase={true}
          />
        </div>
      )}
      <PasswordField hasValidations />
      <PasswordField
        fieldNameFromProps={props.repeatPasswordFieldName}
        labelFromProps="تکرار کلمه عبور"
        validate={repeatNewPasswordValidation}
      />

      <Button
        className={{ extra: "my-2" }}
        type="submit"
        disabled={props.buttonDisabled}
        loading={props.loading}
      >
        ثبت
      </Button>

      <PasswordValidationRows />
    </div>
  );
};

export default SetPasswordForm;
