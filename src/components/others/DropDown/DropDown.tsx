import {Types} from "../../../types/types";
import useDropDown from "./hooks/useDropDown";
import {SetStateType} from "../../../types/SetStateType";


export type DropDownProps = {
  dropDownOpen: boolean;
  setDropDownOpen: SetStateType<boolean>;
  children: Types['children'];
  dropDownElement: Types['children'];
  origin?: 'right' | 'left';
  onChangeDropDownOpenState?: (dropDownOpen: boolean) => void;
}

function DropDown(
  {
    children, dropDownElement, origin = 'right', onChangeDropDownOpenState, dropDownOpen, setDropDownOpen
  }: DropDownProps
) {

  const {
    childrenRef, childrenOnClick, shouldBeRemoved, dropDownStyle,
    dropDownOnClick, showWithAnimation
  } = useDropDown({
    onChangeDropDownOpenState, origin, dropDownOpen, setDropDownOpen
  })

  return (
    <div ref={childrenRef} onClick={childrenOnClick}>
      {children}

      {!shouldBeRemoved && (
        <div
          style={dropDownStyle} onClick={dropDownOnClick}
          className={`fixed duration-200 shadow bg-white rounded-xl origin-top ${showWithAnimation ? '' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          {dropDownElement}
        </div>
      )}
    </div>
  )
}

export default DropDown