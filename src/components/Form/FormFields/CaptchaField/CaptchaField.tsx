import useGetRequiredErrorMessage from "../../../../hooks/ReactHookForm/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import InputForm from "../../Input/InputForm";
import {
  captchaFieldName,
  captchaLabel
} from "./CaptchaFieldExports";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import useAxios from "../../../../request/hooks/useAxios";
import APIES from "../../../../constance/apies";
import RepeatIcon from "../../../svg/RepeatIcon";
import {useFormContext} from "react-hook-form";
import Loading from "../../../others/Loading/Loading";
import {inputSizes} from "../../Input/hooks/useInputStyles";

export type CaptchaFieldRefType = {
  getCaptcha: () => void,
  clearInput: () => void,
  secret: string,
}

const CaptchaField: React.ForwardRefRenderFunction<CaptchaFieldRefType> = ({}, ref) => {

  const {setValue} = useFormContext()

  const requiredErrorMessage = useGetRequiredErrorMessage(captchaLabel)
  const getErrorMessage = useGetFormErrorMessage()
  const errorMessage = getErrorMessage(captchaFieldName)

  const [captchaResponse, captchaRequest] = useAxios()

  const [captchaImage, setCaptchaImage] = useState('')
  const [secret, setSecret] = useState('')

  function getCaptcha() {
    const url = APIES.CAPTCHA
    captchaRequest({ url }).then((res) => {
      const data = res.data
      setSecret(data.secret)
      setCaptchaImage(data.captcha)
    });
  }

  useEffect(function () {
    getCaptcha()
  }, [])

  useImperativeHandle(ref, () => ({
    getCaptcha,
    secret,
    clearInput: () => setValue(captchaFieldName, '')
  }), [secret]);

  return (
    <div className='grid grid-cols-2 gap-x-1.5 mt-5'>
      <InputForm
        fieldName={captchaFieldName}
        inputProps={{
          errorMessage,
          placeholder: 'کد امنیتی',
          endAdornment: <RepeatIcon />,
          endAdornmentOnClick: getCaptcha,
          maxLength:5,
          useTrim: true
        }}
        rules={{
          required: requiredErrorMessage,
        }}

      />
      <div className={`flex items-center justify-center relative bg-gray-200 ${inputSizes.md}`}>
        {captchaResponse.loading ? <Loading size='sm' /> : captchaImage && <img src={captchaImage} alt='captcha'/>}
      </div>
    </div>
  )
}

export default forwardRef(CaptchaField)