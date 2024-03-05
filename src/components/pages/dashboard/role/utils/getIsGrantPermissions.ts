import {
  PermissionsResponseType
} from "../../../../Form/FormFields/RoleNameField/utils/getMappedPermissionsFromResponse";


type Props = {
  responseResult: PermissionsResponseType
}

function getIsGrantPermissions({responseResult}: Props) {

  const checkedPermissions: string[] = []

  function loopOnPermissions(permissionsNodes:PermissionsResponseType) {
    for (const permissionsNode of permissionsNodes) {
      if (permissionsNode.isGrant) checkedPermissions.push(permissionsNode.permissionName)
      const children = permissionsNode.permissions
      if (children && children.length > 0) loopOnPermissions(children)
    }
  }

  loopOnPermissions(responseResult)

  return checkedPermissions
}

export default getIsGrantPermissions