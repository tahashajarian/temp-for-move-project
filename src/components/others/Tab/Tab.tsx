import React, {useRef, useState} from "react";
import TabOption from "./TabOption";
import TabActiveElement from "./TabActiveElement";


type ItemIdType = number | string

export type TabsProps = {
  tabs: { id: ItemIdType, title: string }[],
  onClick: (index: ItemIdType) => void
  activeTab: any
  onChange: (itemId:any) => void
}

function Tab({ tabs, activeTab, onChange }: TabsProps) {

  const [activeSpanStyle, setActiveSpanStyle] = useState({ width: 0, right: 0 })
  const filtersRef = useRef(null)

  function onClickHandler(itemId: ItemIdType) {
    onChange(itemId)
  }

  function onChangeActiveSpanHandler(width: number, right: number) {
    setActiveSpanStyle({ width, right })
  }

  const filterRef2  = useRef<any>([])

  return (
    <div
      className="flex items-end hide-scroll overflow-x-scroll overflow-y-hidden w-full relative"
      ref={filtersRef}
    >
      {tabs.map((item, index) => (
        <TabOption
          filterRef2={filterRef2}
          onChangeActiveSpan={onChangeActiveSpanHandler}
          key={item.id}
          // largerThanMd={largerThanMd}
          index={index}
          isActive={item.id === activeTab}
          onClick={() => onClickHandler(item.id)}
          className={`py-2 px-4 flex-shrink-0 transition-all cursor-pointer 
								select-none snap-start text-center truncate `}
        >
          {item.title}
        </TabOption>
      ))}

      <TabActiveElement style={{ width: `${activeSpanStyle.width}px`, right: `${activeSpanStyle.right}px` }} />
    </div>
  );
}

export default Tab;