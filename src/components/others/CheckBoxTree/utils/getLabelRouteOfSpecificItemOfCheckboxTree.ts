import {
  CheckBoxNodeType,
  CustomCheckboxTreeValueType
} from "../CheckBoxTree";


function getLabelRouteOfSpecificItemOfCheckboxTree(nodes: CheckBoxNodeType[], target:CustomCheckboxTreeValueType, routes:string[], finalCallback: (routes: string[]) => void) {
  for (const node of nodes ?? []) {
    if (node.value == target) {
      routes.push(node.label)
      return finalCallback(routes)
    }

    const routesInstance = [...routes]
    routesInstance.push(node.label)

    if (!node.children) continue

    getLabelRouteOfSpecificItemOfCheckboxTree(node.children, target, routesInstance, finalCallback)
  }
}

export default getLabelRouteOfSpecificItemOfCheckboxTree;