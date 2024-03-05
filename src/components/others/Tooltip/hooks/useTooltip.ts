import {useMemo, useRef, useState} from "react";
import useDisplayWithAnimation from "../../DisplayWithAnimation/hooks/useDisplayWithAnimation";
import {TooltipProps} from "../Tooltip";

function useTooltip({margin = 10, placement = 'top'}: Pick<TooltipProps, 'margin' | 'placement'>) {

  const elementRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  })

  function onMouseEnter() {
    setOpen(true)
    const targetClickedPostion = elementRef?.current?.getBoundingClientRect();
    if (!targetClickedPostion) return

    const placements = {
      top: {
        left: targetClickedPostion.left + targetClickedPostion.width/2,
        top: targetClickedPostion.top - margin,
      },
      left: {
        left: targetClickedPostion.right - targetClickedPostion.width - margin,
        top: targetClickedPostion.top + targetClickedPostion.height/2,
      },
      right: {
        left: targetClickedPostion.right + margin,
        top: targetClickedPostion.top + targetClickedPostion.height/2,
      },
      bottom: {
        left: targetClickedPostion.left + targetClickedPostion.width/2,
        top: targetClickedPostion.bottom + margin,
      },
    }

    setPosition(placements[placement]);
  }

  function onMouseLeave() {
    setOpen(false)
  }

  const {shouldBeRemoved, showWithAnimation} = useDisplayWithAnimation({show: open})

  const transform = useMemo(function () {

    const placements = {
      top: '-translate-x-1/2 -translate-y-full',
      left: '-translate-x-full -translate-y-1/2',
      right: '-translate-y-1/2',
      bottom: '-translate-x-1/2',
    }

    return placements[placement]
  }, [placement])

  return {
    onMouseEnter, elementRef, onMouseLeave, shouldBeRemoved, position, transform, showWithAnimation
  }
}

export default useTooltip