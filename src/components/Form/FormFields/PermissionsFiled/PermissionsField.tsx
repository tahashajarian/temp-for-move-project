import CheckBoxTreeWithSearchForm from "../../../others/CheckBoxTree/CheckBoxTreeWithSearchForm";
import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import {
  permissionsFieldName,
  permissionsLabel
} from "./PermissionsFieldExports";
import {useEffect, useMemo} from "react";
import {usePermissionsContext} from "../../../../contexts/PermissionsContext";
import getMappedPermissionsFromResponse from "../RoleNameField/utils/getMappedPermissionsFromResponse";



function PermissionsField() {

  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(permissionsFieldName)

  const {permissionsResponse, fetchPermissions} = usePermissionsContext()

  useEffect(() => {
    fetchPermissions()
  }, [])

  const nodes = useMemo(() => getMappedPermissionsFromResponse(permissionsResponse?.data?.result), [permissionsResponse.data])

  return (
    <CheckBoxTreeWithSearchForm
      label={permissionsLabel}
      fieldName={permissionsFieldName}
      rules={{
        validate: (checked: string[]) => {
          return checked?.length > 0 ? true : 'انتخاب حداقل یک دسترسی الزامی است'
        },
      }}
      errorMessage={errorMessage || ''}
      nodes={nodes || []}
      searchInputWidth='w-full'
    />
  );
}

export default PermissionsField