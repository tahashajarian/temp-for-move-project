import {useEffect, useRef, useState} from "react";
import useOutsideClicked from "../../../../../../hooks/useOutsideClicked";
import elementIsVisibleInViewport from "../../../../../../utils/elementIsVisibleInViewport";
import {TdMoreOption} from "../TdMore";

function useTdMore() {

  const moreIconWrapperRef = useRef<HTMLDivElement>(null)
  const moreIconRef = useRef<HTMLDivElement>(null)
  const optionContainerRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  const [topOptionContainer, setTopOptionContainer] = useState({
    x: 0,
    y: 0,
  });

  useOutsideClicked(moreIconWrapperRef, () => setOpen(false))

  function openHandler(e:any) {
    setOpen(prev => !prev)

    const targetClickedPostion = moreIconRef?.current?.getBoundingClientRect();
    if (!targetClickedPostion) return

    setTopOptionContainer({
      x: targetClickedPostion.left,
      y: targetClickedPostion.top + 40,
    });
  }

  useEffect(() => {
    setTimeout(function () {
      if (!open || !optionContainerRef?.current) return

      const optionsContainerIsVisible = elementIsVisibleInViewport(optionContainerRef?.current)

      if (optionsContainerIsVisible) return

      const containerHeight = optionContainerRef.current.clientHeight;
      setTopOptionContainer(prev => ({
        ...prev,
        y: topOptionContainer.y - containerHeight - 50,
      }));
    },10)
  }, [open, optionContainerRef?.current]);

  useEffect(function () {
    const closeDropDown = () => {
      setOpen(false)
    }
    open && document.addEventListener('scroll', closeDropDown)

    return () => {
      open && document.removeEventListener('scroll', closeDropDown)
    }
  }, [open])

  function onClickHandler(item:TdMoreOption) {
    setOpen(false)
    item.onClick()
  }

  return {
    moreIconWrapperRef, openHandler, moreIconRef, open, optionContainerRef, topOptionContainer, onClickHandler
  }
}

export default useTdMore