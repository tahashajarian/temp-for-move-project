import {useMemo} from "react";
import {CheckBoxNodeType} from "../CheckBoxTree";
import {TreeNodeProps} from "../TreeNode";

const hasChildrenCondition = (children:undefined | CheckBoxNodeType[]) => (children && children?.length > 0)

type CheckedStatuses = 'checked' | 'indeterminate' | 'unChecked'

function useTreeNode(
  {
    node, checked, setChecked, expanded, setExpanded
  }: Pick<TreeNodeProps, 'node' | 'checked' | 'setChecked' | 'expanded' | 'setExpanded'>
) {

  const {children, label} = node;

  const checkedStatus: CheckedStatuses = useMemo(function () {
    if (node?.children && node?.children?.length > 0) {
      const allChildsIsChecked = isAllNestedChildrenChecked()
      const someChildsIsChecked = hasCheckedNodeInAllNesterdChildren()

      if (allChildsIsChecked) return 'checked'
      if (someChildsIsChecked) return 'indeterminate'

      return 'unChecked'
    }
    return checked?.includes(node.value) ? 'checked' : 'unChecked'
  }, [node.value, checked])

  const showChildren = useMemo(function () {
    return expanded?.includes(node.value)
  }, [node.value, expanded])

  const hasChildren = useMemo(function () {
    return children && children.length !== 0
  }, [children])

  function isAllNestedChildrenChecked() {
    let allNestedChildrenChecked = true

    function loopOnChildren(currentNode:CheckBoxNodeType) {
      for (const childNode of currentNode?.children || []) {
        if (childNode.children && childNode.children.length > 0) {
          loopOnChildren(childNode)
          continue
        }
        const isChecked = checked?.includes(childNode.value)

        if (!isChecked) {
          allNestedChildrenChecked = false
          break
        }
      }
    }

    loopOnChildren(node)

    return allNestedChildrenChecked
  }

  function hasCheckedNodeInAllNesterdChildren() {
    let someChildsIsChecked = false

    function loopOnChildren(currentNode:CheckBoxNodeType) {
      for (const childNode of currentNode?.children || []) {
        const isChecked = checked?.includes(childNode.value)

        if (isChecked) {
          someChildsIsChecked = true
          break
        }
        childNode?.children && childNode?.children?.length > 0 && loopOnChildren(childNode)
      }
    }

    loopOnChildren(node)

    return someChildsIsChecked
  }

  function onExpand() {
    setExpanded(prev => {
      const isExpanded = prev?.includes(node.value)

      if (isExpanded) {
        const itemsThatShouldBeRemoved = [node.value]

        let children = node.children

        while (hasChildrenCondition(children)) {
          for (const child of children || []) {
            if (hasChildrenCondition(child.children)) {
              itemsThatShouldBeRemoved.push(child.value)
            }
            children = child.children
          }
        }

        return prev?.filter(prevItem => !itemsThatShouldBeRemoved.includes(prevItem))
      }

      return [
        ...prev || [],
        node.value
      ]
    });
  }

  function getAllChildren() {
    const allChildren: string[] = []

    function loopOnChildren(node: CheckBoxNodeType) {
      for (const item of node?.children ?? []) {
        allChildren.push(item.value)
        if (item.children && item.children.length !== 0) loopOnChildren(item)
      }
    }

    loopOnChildren(node)

    return allChildren
  }

  function onCheckHandler() {

    setChecked(prev => {
      const isChecked = prev?.includes(node.value)

      const allChildrenAndThisNode = [
        ...getAllChildren(),
        node.value
      ]

      function getFilteredList() {
        return prev?.filter(item => !allChildrenAndThisNode.includes(item))
      }

      let updatedCheckedList = []

      if (isChecked) {
        updatedCheckedList = getFilteredList() || []
      } else {
        const filteredList = getFilteredList()

        updatedCheckedList = [
          ...filteredList || [],
          ...allChildrenAndThisNode
        ]
      }

      // updatedCheckedList = updateParentNodes(updatedCheckedList)

      return updatedCheckedList
    })

  }

  return {
    hasChildren, onExpand, onCheckHandler, checkedStatus, label, showChildren, children
  }
}

export default useTreeNode