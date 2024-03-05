import useAxios from "../../../../../../../request/hooks/useAxios";
import {useState} from "react";
import useDisplayWithAnimation from "../../../../../../others/DisplayWithAnimation/hooks/useDisplayWithAnimation";
import APIES from "../../../../../../../constance/apies";
import {getResponseSuccess} from "../../../../../../../request/utils/getResponse";
import {useParams} from "react-router-dom";


type Props = {
  updateRoleAndPermissions: () => void;
}

function useAdminUserDeleteRole({updateRoleAndPermissions}: Props) {

  const [deleteResponse, deleteRequest] = useAxios()
  const [deleteModalRoleId, setDeleteModalRoleId] = useState<string>('')
  const {shouldBeRemoved: deleteModalShouldBeRemoved} = useDisplayWithAnimation({show: Boolean(deleteModalRoleId)})
  const {userId} = useParams()

  async function deleteRoleHandler() {
    const url = APIES.ADMIN_USERS_USER_DELETE_ROLE
    const params = {
      userId,
      role: deleteModalRoleId
    }

    deleteRequest({url, method: "POST", params}).then(async (response) => {
      const {toast} = await import("react-toastify")
      toast.success(getResponseSuccess(response))
      setDeleteModalRoleId('')
      updateRoleAndPermissions()
    })
  }

  function closeDeleteModal() {
    setDeleteModalRoleId('')
  }

  return {
    deleteRoleLoading: deleteResponse?.loading, deleteModalShouldBeRemoved, deleteModalRoleId, setDeleteModalRoleId,
    deleteRoleHandler, closeDeleteModal
  }
}

export default useAdminUserDeleteRole