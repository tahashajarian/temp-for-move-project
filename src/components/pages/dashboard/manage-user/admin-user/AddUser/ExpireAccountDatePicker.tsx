import { DateObject } from "react-multi-date-picker";
import useGetFormErrorMessage from "../../../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import DatePickerForm from "../../../../../Form/DatePicker/DatePickerForm";
import useGetRequiredErrorMessage from "../../../../../../hooks/ReactHookForm/useGetRequiredErrorMessage";

function ExpireAccountDatePicker({}) {
  const requiredErrorMessage = useGetRequiredErrorMessage(
    "تاریخ اعتبار حساب کاربری"
  );
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage("accountExpirationDate");

  return (
    <DatePickerForm
      fieldName={"accountExpirationDate"}
      inputProps={{
        label: "تاریخ اعتبار حساب کاربری",
        placeholder: "انتخاب کنید",
        errorMessage: errorMessage,
      }}
      rules={{
        required: requiredErrorMessage,
      }}
      // @ts-ignore
      defaultValue={new DateObject().add(6, "month")}
    />
  );
}

export default ExpireAccountDatePicker;
