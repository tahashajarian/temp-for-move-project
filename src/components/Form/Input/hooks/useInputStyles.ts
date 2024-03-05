import {InputProps} from "../types/InputProps";
import {useEffect, useRef, useState} from "react";

export const inputSizes = {
  'sm': 'h-[42px]',
  'md': 'h-12',
}

function useInputStyles(
  {
    wrapperClassName, errorMessage, inputClassName, labelClassName, startAdornment, label, inputLtr, endAdornment,
    size='md', disabled,
  }: Pick<InputProps, 'wrapperClassName' | 'errorMessage' | 'inputClassName' | 'labelClassName' | 'startAdornment' | 'label' | 'endAdornment' | 'inputLtr' | 'size' | 'disabled'>
) {

  const [inputCustomStyles, setInputCustomStyles] = useState({})

  const endAdornmentRef = useRef<HTMLDivElement | null>(null)

  useEffect(function () {
    if (!endAdornmentRef) return

    setInputCustomStyles({paddingLeft: endAdornmentRef.current?.clientWidth})
  }, [endAdornment])

  const fieldWrapperStyles = {
    default: `flex flex-col`,
    ...wrapperClassName,
  };

  const inputWrapperStyles = {
    default: `
    ${errorMessage ? `border-red-500` : `border-gray-200 hover:border-gray-400 [&:has(input:focus)]:border-primary`}
    flex items-center shadow-base border block w-full overflow-hidden appearance-none duration-200 
    `,
    background: disabled ? 'bg-gray-50' : 'bg-white',
    shadow: 'shadow-base',
    borderRadius: 'rounded',
    height: inputSizes[size],
    ...wrapperClassName,
  };

  const inputStyles = {
    default: `${inputLtr ? 'ltr' : ''} h-full w-full outline-none text-ellipsis focus:text-clip placeholder:text-xs text-gray-700 font-medium px-2 text-right bg-transparent`,
    fontSize: `text-[13px]`,
    ...inputClassName,
  };

  const labelStyles = {
    default: 'mb-1.5 text-[14px] text-gray-700',
    ...labelClassName,
  };

  return {
    fieldWrapperStyles, inputWrapperStyles, inputStyles, labelStyles, inputCustomStyles, endAdornmentRef
  }
}

export default useInputStyles;