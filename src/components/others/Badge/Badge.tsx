import joinObjectValues from "../../../utils/joinObjectValues";
import useBadgeStyles, {BadgeColorsType, BadgeSizesType} from "./hooks/useBadgeStyles";

export type BadgeProps = {
  text: string;
  onClose?: (e: any) => void;
  color?: BadgeColorsType;
  size?: BadgeSizesType;
  className?: string;
};

export default function Badge({text, onClose, color, className, size}: BadgeProps) {

  const { badgeStyles } = useBadgeStyles({ color, size});

  function onClickHandler(e:any) {
    e.stopPropagation()
    onClose && onClose(e)
  }

  return (
    <div
      className={`flex gap-1 justify-center items-center w-auto space-x-reverse space-x-1.5 ${joinObjectValues(badgeStyles)} 
      ${className}`}
    >
      <span>{text}</span>
      {onClose && (
        <div
          className='p-1 cursor-pointer hover:bg-red-50 duration-200' onClick={onClickHandler}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.931603 0.646447C1.12686 0.451184 1.44345 0.451184 1.63871 0.646447L4.28516 3.29289L6.9316 0.646447C7.12686 0.451184 7.44345 0.451184 7.63871 0.646447C7.83397 0.841709 7.83397 1.15829 7.63871 1.35355L4.99226 4L7.63871 6.64645C7.83397 6.84171 7.83397 7.15829 7.63871 7.35355C7.44345 7.54882 7.12686 7.54882 6.9316 7.35355L4.28516 4.70711L1.63871 7.35355C1.44345 7.54882 1.12686 7.54882 0.931603 7.35355C0.736341 7.15829 0.736341 6.84171 0.931603 6.64645L3.57805 4L0.931603 1.35355C0.736341 1.15829 0.736341 0.841709 0.931603 0.646447Z"
              className='fill-current text-red-400'
            />
          </svg>
        </div>
      )}
    </div>
  );
}
