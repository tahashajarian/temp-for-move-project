
import CustomDatePicker, {CustomDatePickerProps} from "./CustomDatePicker";
import { FormInputProps} from "../../../types/FormInputProps";
import { useController, useFormContext } from "react-hook-form";

type Props = {
  datePickerProps?: any;
  customDatePickerProps?: Partial<CustomDatePickerProps>;
  onSelect?: (value: string | string[]) => void;
  defaultValue?: string | Date;
} & FormInputProps;

function DatePickerForm(
  {
    fieldName,
    rules,
    inputProps,
    datePickerProps,
    customDatePickerProps,
    onSelect,
    defaultValue,
  }: Props) {
  const { control } = useFormContext();

  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController({
    name: fieldName,
    control,
    rules: rules,
    defaultValue: defaultValue || "",
  });
  console.log({value})
  function onChangeHandler(value: string | string[]) {
    onChange(value);
    onSelect && onSelect(value);
  }

  return (
    <CustomDatePicker
      value={value || {}}
      onChangeDate={onChangeHandler}
      inputProps={{
        name,
        onBlur,
        inputRef: ref,
        required: Boolean(rules?.required),
        autoCompleteOff: true,
        ...inputProps,
      }}
      datePickerProps={datePickerProps}
      {...customDatePickerProps && customDatePickerProps}
    />
  );
}

export default DatePickerForm;
