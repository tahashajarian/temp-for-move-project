import {Types} from "../../../../../types/types";
import MoreIcon from "../../../../svg/MoreIcon";
import DisplayWithAnimation from "../../../DisplayWithAnimation/DisplayWithAnimation";
import useTdMore from "./hooks/useTdMore";

export type TdMoreOption = {
  onClick: () => void,
  icon: Types['children'],
  title: string,
}

export type TdMoreProps = {
  list: TdMoreOption[]
}

function TdMore({list}: TdMoreProps) {

  const {
    moreIconWrapperRef, openHandler, moreIconRef, open,
    optionContainerRef, topOptionContainer, onClickHandler
  } = useTdMore()

  return !list || list?.length === 0 ? null : (
    <div className='block relative' ref={moreIconWrapperRef}>
      <MoreIcon onClick={openHandler} wrapperRef={moreIconRef}/>

      <DisplayWithAnimation show={open} removeScaleAnimation>
        <div
          ref={optionContainerRef}
          style={{
            top: `${topOptionContainer.y}px`,
            left: `${topOptionContainer.x}px`,
          }}
          className='rounded flex flex-col shadow-base fixed bg-white divide-gray-200 divide-y z-10 w-60 border border-gray-300'>
          {list.map(item => (
            <div
              onClick={() => onClickHandler(item)}
              key={item.title}
              className='px-2.5 py-4 flex items-center space-x-reverse space-x-2.5 hover:bg-gray-50 cursor-pointer duration-200 select-none'
            >
              {item.icon}
              <p className='text-gray-800 text-base flex'>{item.title}</p>
            </div>
          ))}
        </div>
      </DisplayWithAnimation>
    </div>
  )
}

export default TdMore