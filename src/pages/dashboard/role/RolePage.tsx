import {lazy} from "react";
import {Titles} from "../../../constance/titles";
import DashboardMainLayout from "../../../components/pages/dashboard/DashboardLayout/DashboardMainLayout";
import RolePageFilterSection from "../../../components/pages/dashboard/role/RolePageFilterSection";
import ROLE_COLUMNS from "../../../components/pages/dashboard/role/constances/roleColumns";
import Table from "../../../components/others/Table/Table";
import useRole from "../../../components/pages/dashboard/role/hooks/useRole";

import PermissionsContextProvider from "../../../contexts/PermissionsContext";
import DashboardPadding from "../../../components/pages/dashboard/DashboardLayout/DashboardPadding";
import SuspenseLoading from "../../../components/others/Loading/SuspenseLoading";

const DeleteRoleModal = lazy(() => import('../../../components/pages/dashboard/role/DeleteRoleModal'))
const RoleFormModal = lazy(() => import('../../../components/pages/dashboard/role/RoleFormModal'))
const ModalWithCloseButton = lazy(() => import('../../../components/others/Modal/ModalWithCloseButton'))



function RolePage() {

  const {
    setSearchValue, mappedTableData, listLoading,
    dataLength, currentPage, setCurrentPage,
    rowsPerPage, setRowsPerPage,

    //delete
    deleteModalRoleId, closeDeleteModal, deleteRoleHandler, deleteLoading,
    deleteModalErrorMessage, closeDeleteModalErrorMessage, deleteModalShouldBeRemoved,
    deleteModalErrorMessageShouldBeRemoved,

    //edit
    editMode, onSubmit, roleFormLoading, openCreateModalForm, closeFormModal, modalFormInfo,
    formMethods, modalFormInfoShouldBeRemoved
  } = useRole()

  return (
    <SuspenseLoading>
      <DashboardPadding>
        <PermissionsContextProvider>
          <DashboardMainLayout
            title={Titles.ROLE}
            filterSection={(
              <RolePageFilterSection searchHandler={setSearchValue} openCreateModalForm={openCreateModalForm}/>
            )}
          >
            <Table
              columns={ROLE_COLUMNS}
              data={mappedTableData}
              loading={listLoading}
              //pagination
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              dataLength={dataLength}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              showNumberPages countShowRows
            />
          </DashboardMainLayout>

          {!deleteModalShouldBeRemoved && (
            <DeleteRoleModal
              open={Boolean(deleteModalRoleId)} onClose={closeDeleteModal} onConfirmHandler={deleteRoleHandler}
              loading={deleteLoading}
            />
          )}

          {!deleteModalErrorMessageShouldBeRemoved && (
            <ModalWithCloseButton
              modalErrorMessage={deleteModalErrorMessage} open={Boolean(deleteModalErrorMessage)}
              onClose={closeDeleteModalErrorMessage} title='حذف نقش'
            />
          )}

          {!modalFormInfoShouldBeRemoved && (
            <RoleFormModal
              onClose={closeFormModal} open={Boolean(modalFormInfo)} editMode={editMode} formMethods={formMethods}
              onSubmit={onSubmit} loading={roleFormLoading}
            />
          )}

        </PermissionsContextProvider>
      </DashboardPadding>
    </SuspenseLoading>
  )
}

export default RolePage