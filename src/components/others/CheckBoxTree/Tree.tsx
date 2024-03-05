import {CheckBoxNodeType, CheckBoxTreeProps} from "./CheckBoxTree";
import TreeNode from "./TreeNode";
import {SetStateType} from "../../../types/SetStateType";
import {CheckBoxProps} from "../../Form/CheckBox/CheckBox";

type Props = {
  allNodes: CheckBoxNodeType[]
  data: CheckBoxNodeType[]
  checked?: CheckBoxTreeProps['checked'];
  setChecked: CheckBoxTreeProps['setChecked'];
  expanded?: CheckBoxTreeProps['expanded'];
  setExpanded: CheckBoxTreeProps['setExpanded'];
  shouldUpdateAllNodes: boolean;
  setShouldUpdateAllNodes: SetStateType<boolean>;
  disabled?: CheckBoxProps['disabled'];
}

function Tree(
  {
    data, checked, setChecked, shouldUpdateAllNodes, setShouldUpdateAllNodes, allNodes, expanded, setExpanded,
    disabled
  }: Props
) {
  return (
    <ul>
      {data.map(node => (
        <TreeNode
          key={node.value} node={node} checked={checked} setChecked={setChecked} allNodes={allNodes}
          setExpanded={setExpanded} expanded={expanded} disabled={disabled}
          shouldUpdateAllNodes={shouldUpdateAllNodes} setShouldUpdateAllNodes={setShouldUpdateAllNodes}
        />
      ))}
    </ul>
  )
}

export default Tree