import withSeparator from "../../../../utils/separator/withSeparator";
import convertPersianNumberToEnglish from "../../../../utils/convertPersianNumberToEnglish";
import removeSeparator from "../../../../utils/separator/removeSeparator";
import joinObjectValues from "../../../../utils/joinObjectValues";
import { InputProps} from "../types/InputProps";

type Props = {
  inputStyles: Object;
  inputCustomStyles: Object;
} & Pick<
  InputProps,
  | "maxLength"
  | "bySeparator"
  | "justNumber"
  | "useTrim"
  | "onChange"
  | "onKeyPress"
  | "onEnter"
  | "inputRef"
  | "value"
  | "autoCompleteOff"
  | "defaultValue"
  | "onClick"
  | "rows"
  | "readOnly"
  | "justSelectOnClick"
  | "placeholder"
  | "inputMode"
  | "type"
  | "disabled"
  | "onBlur"
  | "onKeyDown"
  | "name"
  | "hasDotKey"
>;

function useInput({
  maxLength,
  bySeparator,
  justNumber,
  useTrim,
  onChange,
  onKeyPress,
  onEnter,
  value,
  inputRef,
  onKeyDown,
  onBlur,
  inputStyles,
  inputMode,
  disabled,
  type,
  placeholder,
  readOnly,
  justSelectOnClick,
  inputCustomStyles,
  rows,
  defaultValue,
  onClick,
  autoCompleteOff,
  name,
  hasDotKey,
}: Props) {
  function setSeparator(e: any) {
    e.target.value = withSeparator(e.target.value);
  }

  function changePersianNumberToEnglish(e: any) {
    e.target.value = convertPersianNumberToEnglish(e.target.value);
  }

  function onChangeHandler(e: any) {
    const value = removeSeparator(e.target.value);
    if (maxLength && value.length > maxLength) return;
    if (bySeparator) setSeparator(e);
    if (justNumber) changePersianNumberToEnglish(e);
    if (useTrim) e.target.value = e.target.value?.trim();

    onChange && onChange(e);
  }

  function onKeyDownJustNumber(e: any) {
    const keyCode = e.which;

    const dotKeyCode = 46;
    const allowedKeys = [8, 13, ...(hasDotKey ? [dotKeyCode] : [])];

    if (
      !(keyCode > 47 && keyCode < 58) &&
      !(keyCode > 1775 && keyCode < 1786) &&
      !allowedKeys.includes(keyCode)
    ) {
      e.preventDefault();
    }
  }

  function onKeyPressHandler(e: any) {
    onKeyPress && onKeyPress(e);

    if (justNumber) onKeyDownJustNumber(e);

    const keyCode = e.which;
    const isEnterKey = keyCode === 13;

    if (isEnterKey && onEnter) {
      onEnter();
      e.preventDefault();
    }
  }

  const inputProps = {
    ...(name && { id: name }),
    ...(inputRef && { ref: inputRef }),
    ...(value != null ? { value } : {}),
    ...(autoCompleteOff && { autoComplete: "off" }),
    ...(defaultValue && { defaultValue }),
    ...(onClick && { onClick }),
    ...(rows && { rows }),
    onChange: onChangeHandler,
    ...(Object.keys(inputCustomStyles).length !== 0 && {
      style: inputCustomStyles,
    }),
    ...((justSelectOnClick || readOnly) && { readOnly: true }),
    placeholder: placeholder || "",
    inputMode: inputMode || "text",
    type: type || "text",
    disabled: Boolean(disabled),
    className: joinObjectValues(inputStyles),
    onBlur,
    onKeyDown,
    onKeyPress: onKeyPressHandler,
    ...value && {title: value},
  };

  return { inputProps };
}

export default useInput;
