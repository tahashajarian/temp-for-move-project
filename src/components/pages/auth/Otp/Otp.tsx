import {forwardRef, useImperativeHandle} from "react";
import useOtp from "./hooks/useOtp";
import {useController, useFormContext} from "react-hook-form";
import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import {otpFieldName} from "./OtpExports";
import InputErrorMessage from "../../../Form/Input/InputErrorMessage";

export type OtpRefType = {
  clear: () => void,
}

export type OtpProps = {
  className?: string,
  spaceX?: string,
  confirmOTPHandler?: Function,
  inputCount?: number,
  preventEnterEvent: boolean,
}

const Otp: React.ForwardRefRenderFunction<OtpRefType, OtpProps> = (
  {
    className, spaceX, confirmOTPHandler, inputCount = 4,
    preventEnterEvent
  }, ref
) => {

  const {control} = useFormContext()
  const getErrorMessage = useGetFormErrorMessage()
  const errorMessage = getErrorMessage(otpFieldName)

  const {
    field: {onChange, onBlur, name, value},
  } = useController({
    name: otpFieldName,
    control,
    rules: {
      validate: (value: string) => {
        if (value.length !== inputCount) return 'کد تأیید را به طور کامل وارد کنید.'
      }
    },
    defaultValue: "",
  })

  const {
    clear, inputValues, onKeyDownHandler, onChangeHandler, selectText, setFocused
  } = useOtp({
    setOtpCode: onChange, confirmOTPHandler, inputCount, otpCode: value, preventEnterEvent
  })

  useImperativeHandle(ref, () => ({
    clear
  }));


  return (
    <>
      <div id='verify-mobile-input'
           className={`flex justify-center w-full ${spaceX ? spaceX : 'space-x-3'} ${className && className}`}
           style={{direction: "ltr"}}>
        {
          inputValues.map((item, index) => (
            <input
              key={index}
              value={item}
              onKeyUp={(e) => onKeyDownHandler(e)}
              onInput={onChangeHandler}
              onClick={(e) => selectText(e, index)}
              onFocus={() => setFocused(index)}
              type='tel' pattern='[0-9]*'
              id={`verify-input-${index}`}
              className={`
              bg-transparent w-full aspect-square focus:outline-none border rounded-lg text-center
              ${errorMessage ? 'border-red-500' : inputValues[index] === '' ? 'border-gray-200' : 'border-primary'} 
              `}
              maxLength={1}
            />
          ))
        }
      </div>

      <InputErrorMessage errorMessage={errorMessage} />
    </>
  )
}

export default forwardRef(Otp);