import useAxios from "../../../../../request/hooks/useAxios";
import {useEffect, useState} from "react";
import APIES from "../../../../../constance/apies";
import useGetMappedTableDataWithMoreColumn from "../../../../others/Table/hooks/useGetMappedTableDataWithMoreColumn";
import TD_MORE_OPTIONS from "../../../../others/Table/TableBody/TdMore/tdMoreOptions";
import getUrlWithParams from "../../../../../utils/getUrlWithParams";
import useRoleDelete from "./useRoleDelete";
import useRoleForm from "./useRoleForm";
import {useUserPermissionsContext} from "../../../../../contexts/UserPermissionsContext/UserPermissionsContext";
import PERMISSIONS_NAMES from "../../../../../constance/permissionsNames";

function useRole() {

  const [listResponse, listRequest] = useAxios()
  const [searchValue, setSearchValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [currentPageData, setCurrentPageData] = useState<any[]>([])

  function handleCurrentPageData() {
    const data = listResponse?.data?.result

    const from = (currentPage - 1) * rowsPerPage
    const to = currentPage * rowsPerPage

    setCurrentPageData(data?.slice(from, to))
  }

  useEffect(() => {
    setCurrentPage(1)
    handleCurrentPageData()
  }, [listResponse.data]);

  useEffect(() => {
    handleCurrentPageData()
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    fetchList()
  }, [searchValue]);

  function fetchList() {
    const params = {
      ...searchValue && {RoleName: searchValue}
    }
    const url = getUrlWithParams(APIES.ROLE_LIST, params)
    listRequest({url}).then()
  }

  const {hasPermission} = useUserPermissionsContext()

  const mappedTableData = useGetMappedTableDataWithMoreColumn({
    data: currentPageData, actions: (rowId) => [
      ...hasPermission(PERMISSIONS_NAMES.ROLE_DISPLAY_EDIT) ? [TD_MORE_OPTIONS.VIEW_AND_EDIT(() => setModalFormInfo(rowId))] : [],
      ...hasPermission(PERMISSIONS_NAMES.ROLE_DELETE) ? [TD_MORE_OPTIONS.DELETE(() => setDeleteModalRoleId(rowId))] : [],
    ]
  })

  function changeRowsPerPageHandler(perPage:number) {
    setCurrentPage(1)
    setRowsPerPage(perPage)
  }

  const {
    setDeleteModalRoleId, deleteModalRoleId, closeDeleteModal,
    deleteRoleHandler, deleteResponse, deleteModalErrorMessage, closeDeleteModalErrorMessage,
    deleteModalShouldBeRemoved, deleteModalErrorMessageShouldBeRemoved
  } = useRoleDelete({setCurrentPage, fetchList, allData: listResponse?.data?.result})

  const {
    editMode, onSubmit, roleFormLoading, formMethods,
    openCreateModalForm, setModalFormInfo, closeFormModal, modalFormInfo,
    modalFormInfoShouldBeRemoved,
  } = useRoleForm({allData: listResponse?.data?.result, fetchList})

  return {
    setSearchValue, mappedTableData, listLoading: listResponse.loading, rowsPerPage, setRowsPerPage: changeRowsPerPageHandler,
    dataLength: listResponse.data?.result?.length || 0, currentPage, setCurrentPage,
    fetchList,

    deleteModalRoleId, closeDeleteModal, deleteRoleHandler, deleteLoading: deleteResponse.loading,
    deleteModalErrorMessage, closeDeleteModalErrorMessage, deleteModalShouldBeRemoved,
    deleteModalErrorMessageShouldBeRemoved,

    editMode, onSubmit, roleFormLoading, openCreateModalForm, closeFormModal, modalFormInfo, formMethods,
    modalFormInfoShouldBeRemoved,
  }
}

export default useRole