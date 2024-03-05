import {
  CheckBoxNodeType,
  CustomCheckboxTreeValueType
} from "../CheckBoxTree";

function getRouteOfSpecificItemOfCheckboxTree(nodes: CheckBoxNodeType[], target:CustomCheckboxTreeValueType, routes:string[], finalCallback: (routes: string[]) => void) {
  for (const node of nodes ?? []) {
    if (node.value == target) {
      return finalCallback(routes)
    }

    const routesInstance = [...routes]
    routesInstance.push(node.value)

    if (!node.children) continue

    getRouteOfSpecificItemOfCheckboxTree(node.children, target, routesInstance, finalCallback)
  }
}

export default getRouteOfSpecificItemOfCheckboxTree