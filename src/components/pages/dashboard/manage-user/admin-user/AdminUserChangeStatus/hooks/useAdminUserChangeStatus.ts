import useAxios from "../../../../../../../request/hooks/useAxios";
import {useState} from "react";
import useReactHookFormWrapper
  from "../../../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import {
  adminUserStatusFieldName,
  AdminUserStatusType
} from "../../../../../../Form/FormFields/AdminUserStatusField/AdminUserStatusFieldExports";
import APIES from "../../../../../../../constance/apies";
import {getResponseSuccess} from "../../../../../../../request/utils/getResponse";
import {ADMIN_USER_STATUSES} from "../../../../../../others/Table/TableBody/TdStatus";
import {ADMIN_USER_SELECT_OPTIONS} from "../../../../../../Form/FormFields/AdminUserStatusField/AdminUserStatusField";
import useDisplayWithAnimation from "../../../../../../others/DisplayWithAnimation/hooks/useDisplayWithAnimation";


type FormDataType = {
  [adminUserStatusFieldName]: AdminUserStatusType;
}

type Props = {
  fetchList: () => void;
  data: any;
}

function useAdminUserChangeStatus({fetchList, data}: Props) {

  const [changeStatusResponse, changeStatusRequest] = useAxios()
  const [changeStatusModalAdminUserId, setChangeStatusModalAdminUserId] = useState<string>('')
  const {shouldBeRemoved: changeStatusModalShouldBeRemoved} = useDisplayWithAnimation({show: Boolean(changeStatusModalAdminUserId)})

  const {formMethods, onSubmit} = useReactHookFormWrapper({
    onSubmitHandler,
  })
  const {reset, setValue} = formMethods

  function onSubmitHandler(formData: FormDataType) {
    const data = {
      userId: changeStatusModalAdminUserId,
      statusId: formData[adminUserStatusFieldName]?.id
    }

    const url = APIES.ADMIN_USERS_CHANGE_STATUS

    changeStatusRequest({url, method: 'POST', data}).then(async (res) => {
      const {toast} = await import("react-toastify")

      fetchList()
      console.log({res})
      closeChangeStatusModal()
      toast.success(getResponseSuccess(res))
    })
  }

  function closeChangeStatusModal() {
    setChangeStatusModalAdminUserId('')
    reset()
  }

  function openChangeStatusModal(rowId: string) {
    setChangeStatusModalAdminUserId(rowId)
    const currentItem:any = data.find((item: any) => item.id === rowId)
    const status:keyof typeof ADMIN_USER_STATUSES= currentItem.status
    const statusId = ADMIN_USER_STATUSES[status]?.id
    const currentOption = ADMIN_USER_SELECT_OPTIONS.find((item:any) => item.id === statusId)

    currentOption && setValue(adminUserStatusFieldName, currentOption)
  }

  return {
    changeStatusFormMethods: formMethods, changeStatusOnSubmit: onSubmit, changeStatusModalAdminUserId,
    changeStatusLoading: changeStatusResponse.loading, openChangeStatusModal, closeChangeStatusModal,
    changeStatusModalShouldBeRemoved
  }
}

export default useAdminUserChangeStatus