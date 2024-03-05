import {ReactNode, Ref} from "react";

type ValueType = string | number

type WrapperClassNameType = {
  margin?: string;
  extra?: string;
  borderRadius?: string;
  shadow?: string;
  background?: string;
  height?: string;
}

type InputClassNameType = {
  fontSize?: string;
  padding?: string;
  extra?: string;
}

type LabelClassNameType = {
  fontSize?: string;
  fontWeight?: string;
  extra?: string;
}

export type InputProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: ValueType;
  defaultValue?: ValueType;
  autoCompleteOff?: boolean;
  type?: 'text' | 'password';
  inputMode?: 'text' | 'numeric';
  disabled?: boolean;
  errorMessage?: string;
  onChange?: (e:any) => void;
  onBlur?: () => void;
  onKeyDown?: (e:any) => void;
  onKeyPress?: (e:any) => void;
  wrapperClassName?: WrapperClassNameType;
  inputClassName?: InputClassNameType;
  labelClassName?: LabelClassNameType;
  inputRef?: any;
  endAdornment?: ReactNode;
  endErrorMessage?: ReactNode;
  startAdornment?: ReactNode;
  onClick?: () => void
  inputWrapperOnClick?: () => void;
  justSelectOnClick?: () => void | boolean;
  fileInput?: ReactNode;
  rows?: number;
  required?: boolean
  readOnly?: boolean,
  endAdornmentClass?: string,
  endAdornmentPadding?: string,
  endAdornmentOnClick?: () => void,
  inputLtr?: boolean,
  maxLength?: number;
  bySeparator?: boolean;
  justNumber?: boolean;
  hasDotKey?: boolean;
  useTrim?: boolean;
  onEnter?: () => void;
  hiddenErrorMessage?: boolean;
  size?: 'sm' | 'md';
  labelEndAdornment?: ReactNode;
}