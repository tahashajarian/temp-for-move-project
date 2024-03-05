import useReactHookFormWrapper from "../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import useAxios from "../../../../../request/hooks/useAxios";
import APIES from "../../../../../constance/apies";
import {useEffect, useMemo, useState} from "react";
import {roleNameFieldName, RoleNameType} from "../../../../Form/FormFields/RoleNameField/RoleNameFieldExports";
import {
  permissionsFieldName,
  PermissionsType
} from "../../../../Form/FormFields/PermissionsFiled/PermissionsFieldExports";
import getUrlWithParams from "../../../../../utils/getUrlWithParams";
import useDisplayWithAnimation from "../../../../others/DisplayWithAnimation/hooks/useDisplayWithAnimation";
import {useUserPermissionsContext} from "../../../../../contexts/UserPermissionsContext/UserPermissionsContext";
import getIsGrantPermissions from "../utils/getIsGrantPermissions";
import {getResponseData} from "../../../../../request/utils/getResponse";


const MODAL_FORM_STATE = {
  CREATE: 'create'
}

type FormDataType = {
  [roleNameFieldName]: RoleNameType;
  [permissionsFieldName]: PermissionsType;
}


type Props = {
  allData: any[];
  fetchList: () => void,
}

function useRoleForm({allData, fetchList}: Props) {

  const {formMethods, onSubmit} = useReactHookFormWrapper({
    onSubmitHandler,
  })

  const {setValue, reset} = formMethods

  const [modalFormInfo, setModalFormInfo] = useState('')
  const {shouldBeRemoved: modalFormInfoShouldBeRemoved} = useDisplayWithAnimation({show: Boolean(modalFormInfo)})

  const [roleFormResponse, roleFormRequest] = useAxios()
  const {fetchUserPermissions} = useUserPermissionsContext()

  async function onSubmitHandler(formData: FormDataType) {
    const {toast} = await import("react-toastify");

    const editMode = detectIsEditMode()
    const data = {
      roleName: formData[roleNameFieldName],
      claims: formData[permissionsFieldName],
      ...editMode && {roleId: modalFormInfo}
    }

    const url = editMode ? APIES.ROLE_UPDATE : APIES.ROLE_CREATE
    roleFormRequest({url, method: "POST", data}).then((res) => {
      const toastText = editMode ? 'ویرایش نقش با موفقیت انجام شد' :  'نقش با موفقیت ایجاد شد'
      toast.success(toastText)
      closeFormModal()
      fetchList()
      editMode && fetchUserPermissions()
    })
  }

  function openCreateModalForm() {
    setModalFormInfo(MODAL_FORM_STATE.CREATE)
  }

  function closeFormModal() {
    setModalFormInfo('')
  }

  function detectIsEditMode() {
    return Boolean(modalFormInfo && modalFormInfo !== MODAL_FORM_STATE.CREATE)
  }

  const editMode = useMemo(() => {
    return detectIsEditMode()
  }, [modalFormInfo])

  const [permissionsByRoleNameResponse, permissionsByRoleNameRequest] = useAxios()

  useEffect(() => {
    reset()
    if (!detectIsEditMode()) return

    const roleName = allData.find((item: any) => item.id === modalFormInfo)?.name
    setValue(roleNameFieldName, roleName || '')

    const data = {roleName: modalFormInfo}
    const url = getUrlWithParams(APIES.ROLE_PERMISSIONS, data)
    permissionsByRoleNameRequest({url, method: 'POST'}).then(response => {
      const checkedPermissions = getIsGrantPermissions({responseResult: getResponseData(response)})
      setValue(permissionsFieldName, checkedPermissions)
    })
  }, [modalFormInfo]);

  return {
    editMode, onSubmit, roleFormLoading: roleFormResponse.loading, formMethods, openCreateModalForm, setModalFormInfo,
    closeFormModal, modalFormInfo, modalFormInfoShouldBeRemoved
  }
}

export default useRoleForm