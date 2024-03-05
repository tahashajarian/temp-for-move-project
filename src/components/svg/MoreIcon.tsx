import {RefObject} from "react";


type Props = {
  onClick?: (e:any) => void;
  wrapperRef?:  RefObject<HTMLDivElement>;
}

function MoreIcon({onClick, wrapperRef}: Props) {
  return (
    <div
      {...onClick && {onClick}} {...wrapperRef && {ref: wrapperRef}}
      className='w-8 h-8 rounded flex-center border border-gray-200 duration-200 hover:bg-gray-100 cursor-pointer'>
      <div className='w-5 h-5'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className='fill-current text-gray-900'
          version="1.1"
          viewBox="0 0 210 210"
          xmlSpace="preserve"
        >
          <g>
            <path d="M25 80C11.215 80 0 91.215 0 105s11.215 25 25 25 25-11.215 25-25-11.215-25-25-25z"></path>
            <path d="M105 80c-13.785 0-25 11.215-25 25s11.215 25 25 25 25-11.215 25-25-11.215-25-25-25z"></path>
            <path d="M185 80c-13.785 0-25 11.215-25 25s11.215 25 25 25 25-11.215 25-25-11.215-25-25-25z"></path>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default MoreIcon