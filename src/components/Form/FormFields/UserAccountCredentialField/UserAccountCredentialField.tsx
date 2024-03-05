import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import useGetInputPlaceholder from "../../../../hooks/ReactHookForm/useGetInputPlaceholder";
import SelectForm from "../../Select/SelectForm";
import {
  userAccountCredentialFieldName,
  userAccountCredentialLabel,
  userAccountCredentialOptions
} from "./UserAccountCredentialFieldExports";

type Props = {
  disabled?: boolean;
};
function UserAccountCredentialField({ disabled }: Props) {
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(userAccountCredentialFieldName);
  const placeholder = useGetInputPlaceholder(userAccountCredentialLabel);

  return (
    <SelectForm
      options={userAccountCredentialOptions}
      fieldName={userAccountCredentialFieldName}
      inputProps={{
        errorMessage,
        disabled: disabled,
      }}
      rules={{
        required: placeholder,
      }}
    />
  );
}

export default UserAccountCredentialField;
