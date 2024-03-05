import useGetRequiredErrorMessage from "../../../../hooks/ReactHookForm/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import InputForm from "../../Input/InputForm";
import formPatterns from "../../../../constance/form/formPatterns";
import {roleNameFieldName, roleNameLabel} from "./RoleNameFieldExports";

function RoleNameField() {
  const requriredErrorMessage = useGetRequiredErrorMessage(roleNameLabel)
  const getErrorMessage = useGetFormErrorMessage()
  const errorMessage = getErrorMessage(roleNameFieldName)

  return (
    <InputForm
      fieldName={roleNameFieldName}
      inputProps={{
        label:roleNameLabel,
        errorMessage,
        placeholder: roleNameLabel,
        maxLength: 100,
      }}
      rules={{
        required: requriredErrorMessage,
        minLength: formPatterns.minLengthChar(3),
      }}

    />
  );
}

export default RoleNameField