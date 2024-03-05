import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import useGetInputPlaceholder from "../../../../hooks/ReactHookForm/useGetInputPlaceholder";
import SelectForm from "../../Select/SelectForm";
import {SelectOptionType} from "../../Select/Select";
import {
  adminUserStatusFieldName,
  adminUserStatusLabel
} from "./AdminUserStatusFieldExports";


export const ADMIN_USER_SELECT_OPTIONS:SelectOptionType[] = [
  { name: 'در انتظار تایید', id: 0 },
  { name: 'فعال', id: 1 },
  { name: 'غیر فعال', id: 2 },
]

function AdminUserStatusField({}) {
  const getErrorMessage = useGetFormErrorMessage()
  const errorMessage = getErrorMessage(adminUserStatusFieldName)
  const placeholder = useGetInputPlaceholder(adminUserStatusLabel)

  return (
    <SelectForm
      options={ADMIN_USER_SELECT_OPTIONS}
      fieldName={adminUserStatusFieldName}
      inputProps={{
        errorMessage,
        placeholder: adminUserStatusLabel
      }}
      rules={{
        required: placeholder,
      }}
      removeCloseIcon
    />
  );
}

export default AdminUserStatusField