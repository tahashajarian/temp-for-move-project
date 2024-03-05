import {CheckBoxTreeProps} from "../../../components/others/CheckBoxTree/CheckBoxTree";
import {
  PermissionResponseType
} from "../../../components/Form/FormFields/RoleNameField/utils/getMappedPermissionsFromResponse";

function hasCheckedNodeInAllNesterdChildren({node, checked}: { checked:CheckBoxTreeProps['checked'], node: PermissionResponseType }) {
  let someChildsIsChecked = false

  function loopOnChildren(currentNode:PermissionResponseType) {
    for (const childNode of currentNode?.permissions || []) {
      const isChecked = checked?.includes(childNode.permissionName)

      if (isChecked) {
        someChildsIsChecked = true
        break
      }
      childNode?.permissions && childNode?.permissions?.length > 0 && loopOnChildren(childNode)
    }
  }

  loopOnChildren(node)

  return someChildsIsChecked
}

export default hasCheckedNodeInAllNesterdChildren