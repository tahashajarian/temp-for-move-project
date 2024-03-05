import {DateObject} from "react-multi-date-picker";
import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import {birthDateFieldName, birthDateLabel} from "./BirthDateFieldExports";
import DatePickerForm from "../../DatePicker/DatePickerForm";
import useGetInputPlaceholder from "../../../../hooks/ReactHookForm/useGetInputPlaceholder";
import useGetRequiredErrorMessage from "../../../../hooks/ReactHookForm/useGetRequiredErrorMessage";


function BirthDateField({}) {
  const requiredErrorMessage = useGetRequiredErrorMessage(birthDateLabel)
  const getErrorMessage = useGetFormErrorMessage()
  const errorMessage = getErrorMessage(birthDateFieldName)
  const placeholder = useGetInputPlaceholder(birthDateLabel)

  return (
    <DatePickerForm
      fieldName={birthDateFieldName}
      inputProps={{
        label: birthDateLabel,
        errorMessage,
        placeholder,
      }}
      rules={{
        required: requiredErrorMessage,
      }}
      datePickerProps={{
        maxDate: new DateObject().subtract(15, 'year')
      }}
    />
  );
}

export default BirthDateField