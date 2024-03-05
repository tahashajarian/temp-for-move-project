
import joinObjectValues from "../../../utils/joinObjectValues";
import {InputProps} from "./types/InputProps";
import useInputStyles from "./hooks/useInputStyles";
import InputLabel from "./InputLabel";
import InputErrorMessage from "./InputErrorMessage";
import InputEndAdornment from "./EndAdornment/InputEndAdornment";
import useInput from "./hooks/useInput";

export const inputWrapperId = 'input-wrapper'

function Input(
  {
    name, label, placeholder, value, defaultValue, autoCompleteOff, type, inputMode, disabled, wrapperClassName,
    inputClassName, labelClassName, errorMessage, onChange, onBlur, onKeyDown, inputRef, endAdornment, startAdornment,
    onClick, inputWrapperOnClick, justSelectOnClick, fileInput, endAdornmentOnClick, inputLtr,
    onKeyPress, rows, required, readOnly, endAdornmentClass, endAdornmentPadding, endErrorMessage, hiddenErrorMessage,
    justNumber, onEnter, maxLength, bySeparator, useTrim, hasDotKey, size='md', labelEndAdornment
  }: InputProps
) {

  const {
    fieldWrapperStyles, inputStyles, labelStyles,
    inputCustomStyles, endAdornmentRef,inputWrapperStyles
  } = useInputStyles({
    wrapperClassName, inputClassName, labelClassName, errorMessage, startAdornment, label, endAdornment, inputLtr,
    size, disabled
  })

  const {
    inputProps
  } = useInput({
    maxLength, bySeparator, justNumber, useTrim, onChange, onKeyPress, onEnter, value, inputRef, onKeyDown, onBlur,
    inputStyles, inputMode, disabled, type, placeholder, readOnly, justSelectOnClick, inputCustomStyles,
    rows, defaultValue, onClick, autoCompleteOff, name, hasDotKey
  })

  return (
    <div
      className={joinObjectValues(fieldWrapperStyles)}>
      {label && (
        <InputLabel
          {...{label, name, required, labelEndAdornment}}
          className={joinObjectValues(labelStyles)}
        />
      )}

      <div
        id={inputWrapperId}
        {...inputWrapperOnClick && {onClick: inputWrapperOnClick}}
        className={joinObjectValues(inputWrapperStyles)}
      >
        {startAdornment && (
          <div
            className={`h-auto pr-2`}>
            {startAdornment}
          </div>
        )}

        {rows ? (
          <textarea {...inputProps} />
        ) : <input {...inputProps} />}

        {fileInput || null}

        {(endAdornment || errorMessage) && (
          <InputEndAdornment
            endAdornment={endAdornment} endAdornmentClass={endAdornmentClass} endAdornmentOnClick={endAdornmentOnClick}
            endAdornmentPadding={endAdornmentPadding} wrapperRef={endAdornmentRef} errorMessage={errorMessage}
          />
        )}

        {justSelectOnClick && (
          <div
            {...typeof justSelectOnClick === 'function' && {onClick: justSelectOnClick}} tabIndex={0}
              className={`w-full h-full absolute inset-0 cursor-pointer  border-1 rounded-lg duration-200 focus:border-primary/50
             ${errorMessage ? `border-red-500` : `border-gray-300 hover:border-gray-400 `}    `}/>
        )}
      </div>

      {!hiddenErrorMessage && <InputErrorMessage errorMessage={errorMessage} endErrorMessage={endErrorMessage}/>}
    </div>
  );
}

export default Input;