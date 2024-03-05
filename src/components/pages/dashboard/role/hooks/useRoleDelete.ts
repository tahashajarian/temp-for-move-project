import useAxios from "../../../../../request/hooks/useAxios";
import {useState} from "react";
import getUrlWithParams from "../../../../../utils/getUrlWithParams";
import APIES from "../../../../../constance/apies";
import {SetStateType} from "../../../../../types/SetStateType";
import {getErrorMessage, getStatusCode} from "../../../../../request/utils/getResponse";
import useDisplayWithAnimation from "../../../../others/DisplayWithAnimation/hooks/useDisplayWithAnimation";


type Props = {
  allData: any[],
  fetchList: () => void,
  setCurrentPage: SetStateType<number>
}

function useRoleDelete({allData, fetchList, setCurrentPage}: Props) {

  const [deleteResponse, deleteRequest] = useAxios()
  const [deleteModalRoleId, setDeleteModalRoleId] = useState<string>('')
  const {shouldBeRemoved: deleteModalShouldBeRemoved} = useDisplayWithAnimation({show: Boolean(deleteModalRoleId)})
  const [deleteModalErrorMessage, setDeleteModalErrorMessage] = useState<string>('')
  const {shouldBeRemoved: deleteModalErrorMessageShouldBeRemoved} = useDisplayWithAnimation({show: Boolean(deleteModalErrorMessage)})

  async function deleteRoleHandler() {

    const {toast} = await import("react-toastify");

    const params = {
      RoleName: deleteModalRoleId
    }
    const url = getUrlWithParams(APIES.ROLE_DELETE, params)

    deleteRequest({url}).then(res => {

      const statusCode = getStatusCode(res)

      if (statusCode === 511) {
        setDeleteModalErrorMessage(getErrorMessage(res))
      } else {
        toast.success('نقش با موفقیت حذف شد')
        fetchList()
        setCurrentPage(1)
      }

      setDeleteModalRoleId('')
    })
  }

  function closeDeleteModal() {
    setDeleteModalRoleId('')
  }

  function closeDeleteModalErrorMessage() {
    setDeleteModalErrorMessage('')
  }

  return {
    setDeleteModalRoleId, deleteModalRoleId, closeDeleteModal, closeDeleteModalErrorMessage,
    deleteRoleHandler, deleteResponse, deleteModalErrorMessage, deleteModalShouldBeRemoved,
    deleteModalErrorMessageShouldBeRemoved
  }
}

export default useRoleDelete