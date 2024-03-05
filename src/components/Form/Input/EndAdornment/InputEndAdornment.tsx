import {InputProps} from "../types/InputProps";
import ErrorIcon from "../../../svg/ErrorIcon";


type Props = {
  endAdornmentClass?: InputProps['endAdornmentClass'],
  endAdornmentPadding?: InputProps['endAdornmentPadding'],
  endAdornment: InputProps['endAdornment'],
  endAdornmentOnClick?: InputProps['endAdornmentOnClick'],
  errorMessage?: InputProps['errorMessage'],
  wrapperRef?: any,
}

function InputEndAdornment(
  {
    endAdornmentClass, endAdornment, endAdornmentPadding, wrapperRef, endAdornmentOnClick, errorMessage
  }: Props
) {

  const endAdornmentElement = endAdornment ? endAdornment : (
    <ErrorIcon />
  )

  function onClickHandler(e: any) {
    e.stopPropagation()
    endAdornmentOnClick && endAdornmentOnClick()
  }

  return (
    <div className='flex items-center justify-center h-full py-1 px-1 select-none'>
      <div
        {...endAdornmentOnClick && {onClick: onClickHandler}}
        className={`
        flex items-center justify-center relative rounded-full 
        ${endAdornmentPadding || ' p-2'} ${endAdornmentClass || ''} ${Boolean(endAdornmentOnClick) && 'hover:bg-gray-100 duration-200 cursor-pointer'}
        `}>
        {endAdornmentElement}
      </div>
    </div>
  );
}

export default InputEndAdornment