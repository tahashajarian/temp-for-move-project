import {Types} from "../../../types/types";
import useTooltip from "./hooks/useTooltip";


export type TooltipProps = {
  children: Types['children'];
  title: string;
  className?: string;
  placement?: 'top' | 'right' | 'left' | 'bottom';
  margin?: number;
}

function Tooltip({children, title, className, placement, margin}: TooltipProps) {

  const {
    onMouseEnter, elementRef, onMouseLeave, shouldBeRemoved, position, transform, showWithAnimation
  } = useTooltip({placement, margin})

  return (
    <>
      <div
        {...className && {className}} onMouseEnter={onMouseEnter} ref={elementRef} onMouseLeave={onMouseLeave}
      >
        {children}
      </div>

      {!shouldBeRemoved && (
        <div
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          className={`fixed whitespace-nowrap overflow-hidden px-4 py-2 rounded-md ${transform} bg-black/80 text-white w-auto duration-200 ${showWithAnimation ? '' : `opacity-0 pointer-events-none scale-95`}`}
        >
          {title}
        </div>
      )}
    </>
  )
}

export default Tooltip