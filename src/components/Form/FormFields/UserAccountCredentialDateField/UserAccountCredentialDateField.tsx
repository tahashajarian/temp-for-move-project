import useGetRequiredErrorMessage from "../../../../hooks/ReactHookForm/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import useGetInputPlaceholder from "../../../../hooks/ReactHookForm/useGetInputPlaceholder";
import DatePickerForm from "../../DatePicker/DatePickerForm";
import {
  userAccountCredentialDateFieldName,
  userAccountCredentialDateLabel
} from "./UserAccountCredentialDateFieldExports";

type Props = {
  disabled?: boolean;
};

function UserAccountCredentialDateField({ disabled }: Props) {
  const requiredErrorMessage = useGetRequiredErrorMessage(
    userAccountCredentialDateLabel
  );
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(userAccountCredentialDateFieldName);
  const placeholder = useGetInputPlaceholder(userAccountCredentialDateLabel);

  return (
    <DatePickerForm
      fieldName={userAccountCredentialDateFieldName}
      inputProps={{
        errorMessage,
        placeholder,
        disabled,
      }}
      rules={{
        required: requiredErrorMessage,
      }}
    />
  );
}

export default UserAccountCredentialDateField;
