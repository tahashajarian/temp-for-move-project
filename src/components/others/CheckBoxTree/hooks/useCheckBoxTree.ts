import {useEffect, useState} from "react";
import getRouteOfSpecificItemOfCheckboxTree from "../utils/getRouteOfSpecificItemOfCheckboxTree";
import {
  CheckBoxNodeType,
  CheckBoxTreeProps,
  CustomCheckboxTreeValueType
} from "../CheckBoxTree";

function useCheckBoxTree({filterValue, nodes, setExpanded}: Pick<CheckBoxTreeProps, 'filterValue' | 'nodes' | 'setExpanded'>) {

  const [filteredNodes, setFilteredNodes] = useState<CheckBoxNodeType[]>(nodes)
  const [shouldUpdateAllNodes, setShouldUpdateAllNodes] = useState<boolean>(false)

  useEffect(function () {
    if (!filterValue) {
      setFilteredNodes(nodes)
      setExpanded([])
      return
    }

    const reducedNodes = nodes.reduce(filterNodes, [])
    setFilteredNodes([...reducedNodes])
  }, [filterValue])

  useEffect(function () {
    setFilteredNodes(nodes)
  }, [nodes])

  function setDefaultExpanded(nodes: CheckBoxNodeType[], target:any[]) {

    let expanded: CustomCheckboxTreeValueType[] = []

    target.forEach((item:any) => {
      getRouteOfSpecificItemOfCheckboxTree(nodes, item, [], function (routes) {
        expanded = [...expanded, ...routes]
      })
    })

    setExpanded(prev => [...prev || [], ...expanded])
  }

  function filterNodes(filtered:any, node: CheckBoxNodeType) {
    const children = (node.children || []).reduce(filterNodes, [])

    if (
      // Node's label matches the search string
      node.label.toLocaleLowerCase().indexOf(String(filterValue).toLocaleLowerCase()) > -1 ||
      // Or a children has a matching node
      children.length
    ) {
      filtered.push({ ...node, ...children.length === 0 ? {} : {children}});
      setDefaultExpanded(nodes, [node.value])
    }

    return filtered;
  }

  return {
    filteredNodes, shouldUpdateAllNodes, setShouldUpdateAllNodes,
  }
}

export default useCheckBoxTree