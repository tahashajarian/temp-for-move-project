import {useController, useFormContext} from "react-hook-form";
import Select, {SelectProps} from "./Select";
import {FormInputProps} from "../../../types/FormInputProps";


type Props = {
  options?: SelectProps['options'];
  apiAddress?: SelectProps['apiAddress'];
  mode?: SelectProps['mode'];
  removeCloseIcon?: SelectProps['removeCloseIcon'];
} & FormInputProps

function SelectForm({inputProps, rules, fieldName, options, apiAddress, mode, removeCloseIcon}: Props) {

  const {control} = useFormContext()

  const {
    field: {onChange, onBlur, name, value, ref},
  } = useController({
    name: fieldName,
    control,
    rules,
    defaultValue: "",
  });

  return (
    <Select
      name={name}
      {...options && {options}}
      {...apiAddress && {apiAddress}}
      {...removeCloseIcon && {removeCloseIcon}}
      onSelect={onChange}
      value={value}
      inputProps={{
        inputRef: ref,
        onBlur,
        placeholder: 'انتخاب کنید',
        required: Boolean(rules?.required),
        ...inputProps
      }}
      mode={mode}
    />
  );
}

export default SelectForm