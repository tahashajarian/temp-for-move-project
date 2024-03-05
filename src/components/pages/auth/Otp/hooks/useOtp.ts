import {useEffect, useState} from "react";
import {OtpProps} from "../Otp";

export const correctEnglishKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
export const correctPersianKeys = {
  '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9', '۰': '0'
} as const


type Props = {
  otpCode: string,
  setOtpCode: (value: string) => void,
} & Pick<OtpProps, 'inputCount' | 'confirmOTPHandler' | 'preventEnterEvent'>

function useOtp(
  {
    inputCount = 4, confirmOTPHandler, preventEnterEvent, otpCode, setOtpCode
  }:Props
) {

  const [focused, setFocused] = useState(0)

  const initialInputValues = new Array(inputCount).fill('')
  const [inputValues, setInputValues] = useState<string[]>(initialInputValues)

  function clear() {
    setInputValues(initialInputValues)
    setFocused(0)
    focusToActiveIndex(0)
  }

  const selectText = (e: any, inputNumber: number) => {
    e.target.select();
    setFocused(inputNumber)
  }


  const changeArrayValue = (index:any, value: any) => {
    const inputValuesInstance = inputValues.slice();
    inputValuesInstance.splice(index, 1, value)
    setInputValues(inputValuesInstance)
  }


  function onChangeHandler(e:any) {
    const elemId = parseInt(e.target.id.split('-')[2])
    const value = e.target.value

    if (correctEnglishKeys.includes(value)) {
      changeArrayValue(elemId, parseInt(value))
    } else if (Object.keys(correctPersianKeys).includes(value)) {
      //@ts-ignore
      changeArrayValue(elemId, Number(correctPersianKeys[value]));
    } else {
      return
    }

    setFocused(prev => prev < (inputCount - 1) ? prev + 1 : (inputCount - 1))
  }

  const onKeyDownHandler = (e:any) => {
    const elemId = parseInt(e.target.id.split('-')[2])
    const elemKey = e.key

    if (elemKey === 'Backspace') {
      if (inputValues[elemId] === '' && elemId > 0) {
        changeArrayValue((elemId - 1), '')

        setFocused(prev => prev > 0 ? prev - 1 : 0)
      } else {
        changeArrayValue(elemId, '')
      }
    } else if (elemKey === 'Enter') {
      (confirmOTPHandler && !preventEnterEvent) && confirmOTPHandler()
    }
  }

  const onInitInputValues = () => {
    const initialInputValues = new Array(inputCount).fill('')
    setInputValues(initialInputValues)
  }

  useEffect(() => {
    if (otpCode?.length === inputCount) {
      confirmOTPHandler && confirmOTPHandler()
    }
  }, [otpCode, inputCount])


  useEffect(() => {
    setOtpCode(inputValues?.join('') || '')
  }, [inputValues.join('')])

  useEffect(() => {
    onInitInputValues()
  }, [inputCount])

  useEffect(() => {
    focusToActiveIndex(focused)
  }, [focused])

  function focusToActiveIndex(focusIndex:number) {
    const element:HTMLInputElement = document.querySelector(`#verify-input-${focusIndex}`)!
    element?.focus()
    element?.select()
  }

  return {
    clear, inputValues, onKeyDownHandler, onChangeHandler, selectText, setFocused
  }
}

export default useOtp