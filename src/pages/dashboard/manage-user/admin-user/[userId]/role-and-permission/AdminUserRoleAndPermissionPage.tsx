
import useAxios from "../../../../../../request/hooks/useAxios";
import {useEffect, useMemo, useState} from "react";
import APIES from "../../../../../../constance/apies";
import {useParams} from "react-router-dom";
import {getResponseData} from "../../../../../../request/utils/getResponse";
import Badge from "../../../../../../components/others/Badge/Badge";
import Button from "../../../../../../components/Form/Button/Button";
import PlusIcon from "../../../../../../components/svg/PlusIcon";
import CheckBoxTreeWithSearch from "../../../../../../components/others/CheckBoxTree/CheckBoxTreeWithSearch";
import getMappedPermissionsFromResponse
  from "../../../../../../components/Form/FormFields/RoleNameField/utils/getMappedPermissionsFromResponse";
import {CheckBoxTreeProps} from "../../../../../../components/others/CheckBoxTree/CheckBoxTree";
import Loading from "../../../../../../components/others/Loading/Loading";
import getIsGrantPermissions from "../../../../../../components/pages/dashboard/role/utils/getIsGrantPermissions";
import DropDown from "../../../../../../components/others/DropDown/DropDown";
import {
  RoleObjectType
} from "../../../../../../components/pages/dashboard/manage-user/admin-user/AdminUserRoleAndPermissions/AdminUserRoleFormDropDownExports";
import useAdminUserRoleFormDropDown
  from "../../../../../../components/pages/dashboard/manage-user/admin-user/AdminUserRoleAndPermissions/hooks/useAdminUserRoleFormDropDown";
import AdminUserRoleFormDropDown
  from "../../../../../../components/pages/dashboard/manage-user/admin-user/AdminUserRoleAndPermissions/AdminUserRoleFormDropDown";
import useAdminUserDeleteRole
  from "../../../../../../components/pages/dashboard/manage-user/admin-user/AdminUserRoleAndPermissions/hooks/useAdminUserDeleteRole";
import DeleteModal from "../../../../../../components/others/Modal/DeleteModal";


function AdminUserRoleAndPermissionPage() {

  const [allRolesResponse, allRolesRequest] = useAxios()
  const [userRolesResponse, userRolesRequest] = useAxios()
  const {userId} = useParams()

  function getAllRolesList() {
    const url = APIES.ROLE_LIST
    allRolesRequest({url}).then()
  }

  function getUserRolesList() {
    const url = APIES.ADMIN_USERS_USER_ROLES
    const params = {id: userId}
    userRolesRequest({url, params}).then()
  }

  useEffect(() => {
    getAllRolesList()
    getUserRolesList()
  }, []);

  const userRoles: RoleObjectType[] = useMemo(function () {
    if (!allRolesResponse.data || !userRolesResponse.data) return []
    return getResponseData(allRolesResponse)?.filter((item: RoleObjectType) => getResponseData(userRolesResponse)?.includes(item.id))
  }, [allRolesResponse, userRolesResponse])

  //permissions
  const [permissionsResponse, permissionsRequest] = useAxios()

  const [checked, setChecked] = useState<CheckBoxTreeProps['checked']>([])
  const [expanded, setExpanded] = useState<CheckBoxTreeProps['expanded']>([])

  function fetchPermissions() {
    const url = APIES.USER_ROLE_PERMISSIONS
    const params = {userId}
    permissionsRequest({url, method: 'POST', params}).then(response => {
      const checkedPermissions = getIsGrantPermissions({responseResult: getResponseData(response)})
      setChecked(checkedPermissions)
    })
  }

  function updateRoleAndPermissions() {
    fetchPermissions()
    getUserRolesList()
  }

  useEffect(() => {
    fetchPermissions()
  }, []);

  const nodes = useMemo(() => getMappedPermissionsFromResponse(permissionsResponse?.data?.result), [permissionsResponse.data])

  const {
    activeRoleList, onCheck, saveChanges, updateRoleListLoading,
    dropDownOpen, setDropDownOpen
  } = useAdminUserRoleFormDropDown({userRoles, updateRoleAndPermissions})

  const {
    deleteRoleLoading, deleteModalShouldBeRemoved, deleteModalRoleId, setDeleteModalRoleId,
    deleteRoleHandler, closeDeleteModal,
  } = useAdminUserDeleteRole({updateRoleAndPermissions})

  return (
    <>
      <div className='p-4 w-full'>
        <div className='flex items-center justify-between pb-4'>
          <div className='flex items-center space-x-reverse space-x-2'>
            <span className='text-gray-400'>نقش‌های کاربر: </span>

            <div className='flex items-center flex-1 space-x-reverse space-x-2 gap-y-2 flex-wrap'>
              {userRolesResponse?.loading ? (
                <Loading size='sm'/>
              ) : userRoles?.length === 0 ? (
                <span className='text-gray-400 text-sm'>نقشی برای این کاربر تعریف نشده است</span>
              ) : userRoles.map((userRole) => (
                <Badge
                  key={userRole.id} text={userRole.name} size='md' color='blackOutlined'
                  onClose={() => setDeleteModalRoleId(userRole?.id)}
                />
              ))}
            </div>
          </div>

          <DropDown
            dropDownOpen={dropDownOpen} setDropDownOpen={setDropDownOpen}
            dropDownElement={(
              <AdminUserRoleFormDropDown
                activeRoleList={activeRoleList} allRoleList={getResponseData(allRolesResponse) || []}
                onCheck={onCheck} saveChanges={saveChanges} loading={updateRoleListLoading}
              />
            )}
            origin='left'
          >
            <Button size='sm' variant='text'>
              <PlusIcon/>
              <span>افزودن نقش</span>
            </Button>
          </DropDown>
        </div>

        <CheckBoxTreeWithSearch
          setChecked={setChecked} checked={checked}
          expanded={expanded} setExpanded={setExpanded} disabled
          nodes={nodes || []} removeOverflow loading={permissionsResponse?.loading}
        />
      </div>

      <DeleteModal
        onConfirmHandler={deleteRoleHandler} loading={deleteRoleLoading}
        open={Boolean(deleteModalRoleId)} onClose={closeDeleteModal} title='حذف نقش'
      >
        <span>این نقش برای این کاربر حذف شود؟</span>
      </DeleteModal>
    </>
  )
}

export default AdminUserRoleAndPermissionPage