import {InputProps} from "./types/InputProps";
import {useMemo} from "react";

type Props = {
  errorMessage: InputProps['errorMessage'];
  endErrorMessage?: InputProps['endErrorMessage'];
}

function InputErrorMessage({errorMessage, endErrorMessage}: Props) {

  const wrapperClass = 'min-h-[24px]'

  const errorMessageElement = useMemo(function () {
    return (
      <p className={`${wrapperClass} flex-1 text-[11px] flex items-center text-red-500`}>
        {errorMessage || ''}
      </p>
    )
  }, [errorMessage])

  return endErrorMessage ? (
    <div className={`${wrapperClass} flex items-center justify-between`}>
      {errorMessageElement}
      {endErrorMessage}
    </div>
  ) : errorMessageElement
}

export default InputErrorMessage