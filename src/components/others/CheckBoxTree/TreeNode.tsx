import {CheckBoxNodeType, CheckBoxTreeProps} from "./CheckBoxTree";
import Tree from "./Tree";
import CheckBox, {CheckBoxProps} from "../../Form/CheckBox/CheckBox";
import ArrowIcon from "../../svg/ArrowIcon";
import {SetStateType} from "../../../types/SetStateType";
import useTreeNode from "./hooks/useTreeNode";

export type TreeNodeProps = {
  allNodes: CheckBoxNodeType[]
  node: CheckBoxNodeType;
  checked?: CheckBoxTreeProps['checked'];
  setChecked: CheckBoxTreeProps['setChecked'];
  expanded?: CheckBoxTreeProps['expanded'];
  setExpanded: CheckBoxTreeProps['setExpanded'];
  shouldUpdateAllNodes: boolean;
  setShouldUpdateAllNodes: SetStateType<boolean>;
  disabled?: CheckBoxProps['disabled'];
}

function TreeNode(
  {
    node, checked, setChecked, shouldUpdateAllNodes, setShouldUpdateAllNodes, allNodes, expanded, setExpanded,
    disabled
  }: TreeNodeProps
) {

  const {
    hasChildren, onExpand, onCheckHandler, checkedStatus, label,
    showChildren, children
  } = useTreeNode({
    node, checked, setChecked, expanded, setExpanded
  })

  return (
    <>
      <div className='flex items-center mb-2.5 space-x-reverse space-x-1'>
        <div
          {...hasChildren && {onClick: onExpand}}
          className={`w-5 h-5 flex items-center justify-center rounded cursor-pointer duration-200 ml-1 ${hasChildren && 'hover:bg-gray-100'}`}>
          {hasChildren && (
            <ArrowIcon className=''/>
          )}
        </div>
        <CheckBox
          onChange={(value: boolean) => onCheckHandler()} value={checkedStatus === 'checked'}
          indeterminate={checkedStatus === 'indeterminate'} disabled={disabled}
        />
        <span
          onClick={onCheckHandler}
          className='select-none cursor-pointer duration-200 hover:bg-gray-100 px-3 py-1 rounded'
        >
          {label}
        </span>
      </div>
      <ul className='pr-5'>
        {(showChildren && children) && (
          <Tree
            data={children} checked={checked} setChecked={setChecked} allNodes={allNodes}
            expanded={expanded} setExpanded={setExpanded} disabled={disabled}
            shouldUpdateAllNodes={shouldUpdateAllNodes} setShouldUpdateAllNodes={setShouldUpdateAllNodes}
          />
        )}
      </ul>
    </>
  );
}

export default TreeNode