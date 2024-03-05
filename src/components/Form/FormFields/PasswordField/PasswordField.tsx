

import InputForm from "../../Input/InputForm";
import useGetRequiredErrorMessage from "../../../../hooks/ReactHookForm/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import useGetInputPlaceholder from "../../../../hooks/ReactHookForm/useGetInputPlaceholder";
import {
  passwordFieldname,
  passwordLabel
} from "./PasswordFieldExports";
import PasswordFilledIcon from "../../../svg/PasswordFilledIcon";
import EyeOpenOutlineIcon from "../../../svg/EyeOpenOutlineIcon";
import EyeCloseOutlineIcon from "../../../svg/EyeCloseOutlineIcon";
import {useState} from "react";
import {Link} from "react-router-dom";
import ROUTER_LINKS from "../../../../constance/routerLinks";
import FORM_PATTERNS from "../../../../constance/form/formPatterns";
import {useFormContext} from "react-hook-form";
import generateRandomPassword from "../../../../utils/generateRandomPassword/generateRandomPassword";
import {repeatPasswordFieldName} from "../../../pages/auth/SetNewPassword/SetNewPassword";


type Props = {
  forgetPasswordEndAdornment?: boolean;
  fieldNameFromProps?: string;
  labelFromProps?: string;
  hasValidations?: boolean;
  hasGenerateRandomPasswordButton?: boolean;
  validate?: (value:any, watch:any) => any;
}

function PasswordField(
  {
    forgetPasswordEndAdornment, fieldNameFromProps, labelFromProps, hasValidations, validate, hasGenerateRandomPasswordButton
  }: Props
) {

  const { watch, setValue } = useFormContext();

  const fieldName = fieldNameFromProps || passwordFieldname
  const label = labelFromProps || passwordLabel

  const requriredErrorMessage = useGetRequiredErrorMessage(label)
  const getErrorMessage = useGetFormErrorMessage()
  const errorMessage = getErrorMessage(fieldName)
  const placeholder = useGetInputPlaceholder(label)

  const [eyeOpen, setEyeOpen] = useState<boolean>(false)

  function generatePasswordHandler() {
    const randomPassword = generateRandomPassword()
    setValue(fieldName, randomPassword)
    setValue(repeatPasswordFieldName, randomPassword)
  }

  return (
   <>
     <InputForm
       fieldName={fieldName}
       inputProps={{
         label:label,
         errorMessage,
         placeholder,
         startAdornment: <PasswordFilledIcon/>,
         endAdornment: eyeOpen ? <EyeOpenOutlineIcon /> : <EyeCloseOutlineIcon />,
         endAdornmentOnClick: () => setEyeOpen(prev => !prev),
         ...forgetPasswordEndAdornment ? {
           endErrorMessage: (
             <Link to={ROUTER_LINKS.FORGET_PASSWORD}>
               <span className="text-primary text-[13px] pt-1">
                 فراموشی کلمه عبور
               </span>
             </Link>
           )
         } : {},
         ...hasGenerateRandomPasswordButton && {
           labelEndAdornment: (
             <button type='button' className='text-accent text-sm px-1' onClick={generatePasswordHandler}>
               ایجاد کلمه عبور تصادفی
             </button>
           )
         },
         type: eyeOpen ? 'text' : 'password',
         inputLtr: true,
         autoCompleteOff: true,
         maxLength: 25,
         useTrim: true
       }}
       rules={{
         required: requriredErrorMessage,
         ...hasValidations ? {
           minLength: FORM_PATTERNS.minLengthChar(12, FORM_PATTERNS.password.message),
         } : {},
         validate: {
           ...validate ? {validateFromProps: (value: any) => validate && validate(value, watch)} : {},
           ...hasValidations ? {
             containPasswordChars: (value:any) => FORM_PATTERNS.containPasswordChars.value.test(value) ? null : FORM_PATTERNS.containPasswordChars.message,
             password: (value:any) => FORM_PATTERNS.password.value.test(value) ? null : FORM_PATTERNS.password.message,
           } : {}
         }
       }}
     />
   </>
  )
}

export default PasswordField