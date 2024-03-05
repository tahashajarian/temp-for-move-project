import {InputProps} from "./types/InputProps";
import {ReactNode} from "react";


type Props = {
  className?: string;
  labelEndAdornment?: ReactNode;
} & Pick<InputProps, 'label' | 'name' | 'required'>

function InputLabel({label, name, required, className, labelEndAdornment}: Props) {

  const labelElement = (
    <label {...(name && {htmlFor: name})} {...className && {className}}>
      {label}
      {/*{required && <span className='text-red-500 text-xs font-medium mr-1'>*</span>}*/}
    </label>
  )

  return labelEndAdornment ? (
    <div className='flex items-center justify-between'>
      {labelElement}

      {labelEndAdornment}
    </div>
  ) : labelElement
}

export default InputLabel