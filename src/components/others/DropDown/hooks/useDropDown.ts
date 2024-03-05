import {useEffect, useImperativeHandle, useRef, useState} from "react";
import useDisplayWithAnimation from "../../DisplayWithAnimation/hooks/useDisplayWithAnimation";
import useOutsideClicked from "../../../../hooks/useOutsideClicked";
import {DropDownProps} from "../DropDown";

function useDropDown(
  {
    onChangeDropDownOpenState, origin, dropDownOpen, setDropDownOpen
  }: Pick<DropDownProps, 'onChangeDropDownOpenState' | 'origin' | 'dropDownOpen' | 'setDropDownOpen'>
) {

  const { showWithAnimation, shouldBeRemoved } = useDisplayWithAnimation({
    show: dropDownOpen,
  });

  const [dropDownStyle, setDropDownStyle] = useState<any>()
  const childrenRef = useRef<HTMLDivElement>(null)

  useOutsideClicked(childrenRef, closeDropDown)

  function calculateDropDownStyle() {
    const position = childrenRef?.current?.getBoundingClientRect()
    const bodyWidth = document?.body?.clientWidth

    if (!position) return {}

    setDropDownStyle({
      top: position.bottom + 1,
      ...origin === 'right' ? {right: bodyWidth - position?.right} : {left: position?.left},
    })
  }

  useEffect(function () {
    calculateDropDownStyle()
  }, [dropDownOpen])

  function closeDropDown() {
    setDropDownOpen(false)
  }

  function childrenOnClick() {
    setDropDownOpen(prev => !prev)
  }

  function dropDownOnClick(e: any) {
    e.stopPropagation()
  }

  return {
    childrenRef, childrenOnClick, shouldBeRemoved, dropDownStyle, dropDownOnClick, showWithAnimation
  }
}

export default useDropDown