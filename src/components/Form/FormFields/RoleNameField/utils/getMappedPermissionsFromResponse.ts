import {CheckBoxNodeType} from "../../../../others/CheckBoxTree/CheckBoxTree";


export type PermissionResponseType = {
  isGrant: false,
  permissionName: string,
  permissionTitle: string,
  permissions: PermissionResponseType[],
}

export type PermissionsResponseType = PermissionResponseType[]

function getMappedPermissionsFromResponse(data: PermissionsResponseType) {

  if (!data) return

  function loopOnPermissions(permissionsNodes:PermissionsResponseType) {

    const mappedData:CheckBoxNodeType[] = []

    for (const permissionsNode of permissionsNodes) {
      let mappedChildren;
      const children = permissionsNode.permissions
      if (children && children?.length > 0) {
        mappedChildren = loopOnPermissions(children)
      }

      mappedData.push({
        label: permissionsNode.permissionTitle || permissionsNode.permissionName,
        value: permissionsNode.permissionName,
        children: mappedChildren,
      })
    }

    return mappedData
  }

  return loopOnPermissions(data)
}

export default getMappedPermissionsFromResponse