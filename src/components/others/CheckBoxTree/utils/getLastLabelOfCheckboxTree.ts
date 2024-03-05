import getLabelRouteOfSpecificItemOfCheckboxTree from "./getLabelRouteOfSpecificItemOfCheckboxTree";
import {CheckBoxNodeType, CustomCheckboxTreeValueType} from "../CheckBoxTree";

function getLastLabelOfCheckboxTree(options: CheckBoxNodeType[], value: CustomCheckboxTreeValueType) {
  let returnValue;
  getLabelRouteOfSpecificItemOfCheckboxTree(options, value, [], function (routes) {
    const label = routes[routes.length - 1]
    returnValue = label
  })

  return returnValue
}

export default getLastLabelOfCheckboxTree
