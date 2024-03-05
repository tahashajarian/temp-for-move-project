
import {FormInputProps} from "../../../types/FormInputProps";
import Input from "./Input";
import {useController, useFormContext} from "react-hook-form";

export type InputFormPropsType = {
  defaultValue?: string
} & FormInputProps

function InputForm({inputProps, rules, fieldName, defaultValue}: InputFormPropsType) {

  const {control} = useFormContext()

  const {
    field: {onChange, onBlur, name, value, ref},
  } = useController({
    name: fieldName,
    control,
    rules,
    defaultValue: defaultValue || "",
  });

  return (
    <Input
      name={name}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      required={Boolean(rules?.required)}
      {...inputProps}
    />
  );
}

export default InputForm;