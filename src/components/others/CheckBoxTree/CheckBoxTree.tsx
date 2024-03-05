import {SetStateType} from "../../../types/SetStateType";
import Tree from "./Tree";
import useCheckBoxTree from "./hooks/useCheckBoxTree";
import {CheckBoxProps} from "../../Form/CheckBox/CheckBox";

export type CustomCheckboxTreeValueType = any

export type CheckBoxNodeType = {
  label: string;
  value: string;
  children?: CheckBoxNodeType[];
}

export type CheckBoxTreeProps = {
  nodes: CheckBoxNodeType[];
  checked?: string[];
  setChecked: SetStateType<CheckBoxTreeProps['checked']>
  expanded?: string[];
  setExpanded: SetStateType<CheckBoxTreeProps['expanded']>
  filterValue?: string;
  disabled?: CheckBoxProps['disabled'];
}

function CheckBoxTree({nodes, checked, setChecked, expanded, setExpanded, filterValue, disabled}: CheckBoxTreeProps) {

  const {
    filteredNodes, shouldUpdateAllNodes, setShouldUpdateAllNodes,
  } = useCheckBoxTree({
    filterValue, setExpanded, nodes
  })

  return (
    <div>
      {(filteredNodes && filteredNodes?.length > 0) ? (
        <Tree
          data={filteredNodes} setChecked={setChecked} checked={checked} allNodes={nodes}
          expanded={expanded} setExpanded={setExpanded} disabled={disabled}
          shouldUpdateAllNodes={shouldUpdateAllNodes} setShouldUpdateAllNodes={setShouldUpdateAllNodes}
        />
      ) : (
        <div className='flex-center text-gray-500 py-2'>موردی یافت نشد</div>
      )}
    </div>
  )
}

export default CheckBoxTree