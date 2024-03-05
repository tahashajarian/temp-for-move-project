import {Types} from "../../../types/types";
import useDisplayWithAnimation from "./hooks/useDisplayWithAnimation";
import {RefObject} from "react";


export type DisplayWithAnimationProps = {
  show: boolean;
  children: Types['children'];
  removeScaleAnimation?: boolean;
  className?: string;
  wrapperRef?: RefObject<HTMLDivElement>;
}

function DisplayWithAnimation({show, children, removeScaleAnimation, className, wrapperRef}: DisplayWithAnimationProps) {

  const {showWithAnimation, shouldBeRemoved} = useDisplayWithAnimation({show})

  return !shouldBeRemoved ? (
    <div
      {...wrapperRef && {ref: wrapperRef}}
      className={`${showWithAnimation ? '' : `opacity-0 pointer-events-none ${!removeScaleAnimation && 'scale-95'}`} duration-100 origin-bottom ${className || ''}`}>
      {children}
    </div>
  ) : null
}

export default DisplayWithAnimation