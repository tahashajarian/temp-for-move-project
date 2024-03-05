import TickIcon from "../../svg/TickIcon";

export type CheckBoxProps = {
  name?: string;
  value?: boolean;
  onChange?: (e: boolean) => void;
  text?: string;
  wrapperClass?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}

function CheckBox({name, value, onChange, text, wrapperClass, indeterminate, disabled}: CheckBoxProps) {

  function checkHandler() {
    if (disabled) return
    onChange && onChange(!value);
  }

  return (
    <label
      htmlFor={name}
      className={`flex items-center w-fit ${wrapperClass || ''}`}
    >
      <div
        className={`w-5 h-5 box-border rounded-md select-none transition-all border flex items-center justify-center duration-100 overflow-hidden 
        ${(value && !indeterminate) ? disabled ? "bg-gray-300" : "bg-accent" : "bg-white"} ${indeterminate ? 'p-[3px]' : ''} 
        ${disabled ? "" : "hover:border-accent cursor-pointer"}`}
        onClick={checkHandler}
      >
        <div
          className={`w-full h-full transition-all flex items-center justify-center p-0.5 
          ${(value || indeterminate) ? "" : "scale-0"} ${indeterminate ? `${disabled ? "bg-gray-300" : "bg-accent"} rounded` : ''} `}
        >
          {(!indeterminate && value) && <TickIcon textColor={disabled ? "text-gray-500" : "text-white"}/>}
        </div>
      </div>
      {text && (
        <p
          className={"cursor-pointer select-none text-sm text-gray-700 pr-2"}
          onClick={checkHandler}
        >
          {text}
        </p>
      )}
    </label>
  )
}

export default CheckBox