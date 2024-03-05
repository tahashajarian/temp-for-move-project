
import {InputProps} from "../Input/types/InputProps";
import {Types} from "../../../types/types";
import {inputSizes} from "../Input/hooks/useInputStyles";

type Props = {
  label?: InputProps['label'];
  children: Types['children'];
}

function InputLabelRowField({label, children}: Props) {


  return (
    <div className='flex space-x-2 space-x-reverse'>
      {label && <p className={`w-40 ${inputSizes['md']} flex items-center text-gray-500`}>{label}</p>}
      <div className='flex-1'>
        {children}
      </div>
    </div>
  )
}

export default InputLabelRowField