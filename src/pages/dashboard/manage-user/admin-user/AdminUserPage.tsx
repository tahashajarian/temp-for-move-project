
import {Titles} from "../../../../constance/titles";
import FiltersContainer from "../../../../components/pages/dashboard/manage-user/admin-user/UserList/FiltersContainer";
import Table from "../../../../components/others/Table/Table";
import FilterModal from "../../../../components/pages/dashboard/manage-user/admin-user/UserList/FilterModal";
import {ADMIN_USERS_COLUMNS} from "../../../../components/pages/dashboard/manage-user/admin-user/consts";
import DashboardMainLayout from "../../../../components/pages/dashboard/DashboardLayout/DashboardMainLayout";
import TD_MORE_OPTIONS from "../../../../components/others/Table/TableBody/TdMore/tdMoreOptions";
import useGetMappedTableDataWithMoreColumn
  from "../../../../components/others/Table/hooks/useGetMappedTableDataWithMoreColumn";
import useAdminUserChangeMobileNumber
  from "../../../../components/pages/dashboard/manage-user/admin-user/AdminUserChangeMobileNumber/hooks/useAdminUserChangeMobileNumber";
import AddUserModal from "../../../../components/pages/dashboard/manage-user/admin-user/AddUser/AddUserModal";
import useUserList from "../../../../components/pages/dashboard/manage-user/admin-user/UserList/useUserList";
import useAdminUserChangeStatus
  from "../../../../components/pages/dashboard/manage-user/admin-user/AdminUserChangeStatus/hooks/useAdminUserChangeStatus";
import useAdminUserChangePassword
  from "../../../../components/pages/dashboard/manage-user/admin-user/AdminUserChangePassword/hooks/useAdminUserChangePassword";
import DashboardPadding from "../../../../components/pages/dashboard/DashboardLayout/DashboardPadding";
import {useNavigate} from "react-router-dom";
import ROUTER_LINKS from "../../../../constance/routerLinks";
import {useUserPermissionsContext} from "../../../../contexts/UserPermissionsContext/UserPermissionsContext";
import PERMISSIONS_NAMES from "../../../../constance/permissionsNames";
import {lazy} from "react";
import {ADMIN_USER_STATUSES_KEYS} from "../../../../components/others/Table/TableBody/TdStatus";
import CloudFlareCaptcha from "../../../../components/others/CloudFlareCaptcha/CloudFlareCaptcha";
import SuspenseLoading from "../../../../components/others/Loading/SuspenseLoading";


const AdminChangeMobileNumberModal = lazy(() => import('../../../../components/pages/dashboard/manage-user/admin-user/AdminUserChangeMobileNumber/AdminChangeMobileNumberModal'))
const AdminUserChangeStatusModal = lazy(() => import('../../../../components/pages/dashboard/manage-user/admin-user/AdminUserChangeStatus/AdminUserChangeStatusModal'))
const AdminUserChangePasswordModal = lazy(() => import('../../../../components/pages/dashboard/manage-user/admin-user/AdminUserChangePassword/AdminUserChangePasswordModal'))

function AdminUserPage({}) {
  const {
    modalSearchSubmit,
    tableDateRes,
    handleChangeSimpleFilters,
    openModalFilters,
    setOpenModalFilters,
    openModalAddUser,
    setOpenModalAddUser,
    getData,
    simpleFilters,
    onSubmit,
    reset,
    formMethods,
    formDirty,
  } = useUserList()

  const navigate = useNavigate()

  const {hasPermission} = useUserPermissionsContext()

  const mappedTableData = useGetMappedTableDataWithMoreColumn({
    data: tableDateRes?.data?.result?.data,
    actions: (rowId) => {
      const statusIsExpired = tableDateRes?.data?.result?.data?.find((item: any) => item.id === rowId)?.status === ADMIN_USER_STATUSES_KEYS.EXPIRED
      return [
        ...hasPermission(PERMISSIONS_NAMES.ADMIN_USER_ADMIN_PANEL_USERS_DISPLAY_EDIT) ?
          [TD_MORE_OPTIONS.VIEW_AND_EDIT(() => navigate(`${ROUTER_LINKS.MANAGE_ADMIN_USER_LIST}/${rowId}/detail`))] :
          [],
        ...hasPermission(PERMISSIONS_NAMES.ADMIN_USER_ADMIN_PANEL_USERS_DISPLAY_CHANGE_PHONE) ?
          [TD_MORE_OPTIONS.CHANGE_PHONE_NUMBER(() => setChangeMobileNumberModalAdminUserId(rowId))] :
          [],
        ...!statusIsExpired && hasPermission(PERMISSIONS_NAMES.ADMIN_USER_ADMIN_PANEL_USERS_DISPLAY_CHANGE_STATUS) ?
          [TD_MORE_OPTIONS.CHANGE_STATUS(() => openChangeStatusModal(rowId))] :
          [],
        ...hasPermission(PERMISSIONS_NAMES.ADMIN_USER_ADMIN_PANEL_USERS_DISPLAY_CHANGE_PASSWORD) ?
          [TD_MORE_OPTIONS.CHANGE_PASSWORD(() => setChangePasswordModalAdminUserId(rowId))] :
          [],
      ]
    },
  });

  //change mobile number
  const {
    changeMobileNumberModalAdminUserId,
    closeChangeMobileNumberModal,
    setChangeMobileNumberModalAdminUserId,
    changeMobileLoading,
    changeMobileFormMethods,
    changeMobileOnSubmit,
    mobileNumberNotVerifiedMessage,
    onCloseMobileNumberNotVerified,
    onConfirmChangingMobileNumberWhenNotVerified,
    changeMobileNumberModalShouldBeRemoved,
    mobileNumberNotVerifiedMessageModalShouldBeRemoved
  } = useAdminUserChangeMobileNumber({fetchList: getData});

  const {
    changeStatusFormMethods,
    changeStatusOnSubmit,
    changeStatusModalAdminUserId,
    changeStatusLoading,
    openChangeStatusModal,
    closeChangeStatusModal,
    changeStatusModalShouldBeRemoved,
  } = useAdminUserChangeStatus({fetchList: getData, data: mappedTableData});

  const {
    changePasswordFormMethods,
    changePasswordOnSubmit,
    changePasswordModalAdminUserId,
    changePasswordLoading,
    setChangePasswordModalAdminUserId,
    closeChangePasswordModal,
    changePasswordModalShouldBeRemoved,
  } = useAdminUserChangePassword();

  return (
    <SuspenseLoading>
      <DashboardPadding>
        <DashboardMainLayout
          title={Titles.USER_ADMIN}
          filterSection={
            <FiltersContainer
              action={() => {
                setOpenModalAddUser(true);
              }}
              openModalFilters={() => {
                setOpenModalFilters(true);
              }}
              nationalCode={simpleFilters.nationalCode}
              status={simpleFilters.status}
              setFilters={handleChangeSimpleFilters}
              formDirty={formDirty}
            />
          }
        >
          <Table
            columns={ADMIN_USERS_COLUMNS}
            data={mappedTableData}
            loading={tableDateRes.loading}
          />

          <FilterModal
            open={openModalFilters}
            title="جستجو پیشرفته"
            onClose={() => setOpenModalFilters(false)}
            action={modalSearchSubmit}
            formMethods={formMethods}
            onSubmit={onSubmit}
            reset={reset}
          />

          <AddUserModal
            open={openModalAddUser}
            title="ایجاد کاربر"
            onClose={() => setOpenModalAddUser(false)}
            getData={getData}
          />

          <AdminChangeMobileNumberModal
            onClose={closeChangeMobileNumberModal}
            open={Boolean(changeMobileNumberModalAdminUserId)}
            loading={changeMobileLoading}
            formMethods={changeMobileFormMethods}
            onSubmit={changeMobileOnSubmit}
            mobileNumberNotVerifiedMessage={mobileNumberNotVerifiedMessage}
            onCloseMobileNumberNotVerified={onCloseMobileNumberNotVerified}
            onConfirmChangingMobileNumberWhenNotVerified={
              onConfirmChangingMobileNumberWhenNotVerified
            }
            modalShouldBeRemoved={changeMobileNumberModalShouldBeRemoved}
            mobileNumberNotVerifiedMessageModalShouldBeRemoved={mobileNumberNotVerifiedMessageModalShouldBeRemoved}
          />

          {!changeStatusModalShouldBeRemoved && (
            <AdminUserChangeStatusModal
              loading={changeStatusLoading}
              onSubmit={changeStatusOnSubmit}
              formMethods={changeStatusFormMethods}
              open={Boolean(changeStatusModalAdminUserId)}
              onClose={closeChangeStatusModal}
            />
          )}

          {!changePasswordModalShouldBeRemoved && (
            <AdminUserChangePasswordModal
              loading={changePasswordLoading}
              onClose={closeChangePasswordModal}
              onSubmit={changePasswordOnSubmit}
              open={Boolean(changePasswordModalAdminUserId)}
              formMethods={changePasswordFormMethods}
            />
          )}
        </DashboardMainLayout>
      </DashboardPadding>

      <CloudFlareCaptcha />
    </SuspenseLoading>
  );
}

export default AdminUserPage;
