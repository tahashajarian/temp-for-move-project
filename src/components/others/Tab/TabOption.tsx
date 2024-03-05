import React, { ReactNode, useEffect, useRef } from "react";


type TabOptionType = {
  className: string;
  onClick: () => void;
  index: number;
  isActive: boolean;
  children: ReactNode
  onChangeActiveSpan: (width: number, right: number) => void;
  filterRef2: any
}

function TabOption({ children, className, onClick, index, isActive, onChangeActiveSpan, filterRef2 }: TabOptionType) {
  let buttonRef = useRef<any>(null)


  useEffect(function () {
    const width = buttonRef?.current?.offsetWidth

    const buttonRight = buttonRef?.current?.getBoundingClientRect()?.right
    const wrapperRight = buttonRef?.current?.closest('div')?.getBoundingClientRect()?.right
    const right = wrapperRight - buttonRight

    if (isActive && width) {
      console.log({isActive})
      onChangeActiveSpan(width, right)
    }
  }, [isActive])

  return (
    <button
      onClick={onClick} className={`${className} relative`}
      ref={(el) => {
        filterRef2.current[index] = el
        buttonRef.current = el
      }}
    >
      <span>
        {children}
      </span>
    </button>
  );
};

export default TabOption;