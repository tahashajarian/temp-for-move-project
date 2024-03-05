import {SideBarIconPropsType} from "../../../constance/dashboardLayout/sideBarItems";

function ChartIcon({className, textColor}: SideBarIconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...className && {className}}
    >
      <g className={`fill-current duration-200 ${textColor || 'text-gray-600'}`} clipPath="url(#clip0_1250_13084)">
        <path d="M23.25 21H.75a.75.75 0 110-1.5h22.5a.75.75 0 110 1.5z"></path>
        <path
          d="M6.25 21h-4.5a.75.75 0 01-.75-.75v-12C1 7.561 1.561 7 2.25 7h3.5C6.439 7 7 7.561 7 8.25v12a.75.75 0 01-.75.75zM2.5 19.5h3v-11h-3v11zM14.25 21h-4.5a.75.75 0 01-.75-.75v-16C9 3.561 9.561 3 10.25 3h3.5c.689 0 1.25.561 1.25 1.25v16a.75.75 0 01-.75.75zm-3.75-1.5h3v-15h-3v15zM22.25 21h-4.5a.75.75 0 01-.75-.75v-9c0-.689.561-1.25 1.25-1.25h3.5c.689 0 1.25.561 1.25 1.25v9a.75.75 0 01-.75.75zm-3.75-1.5h3v-8h-3v8z"></path>
      </g>
      <defs>
        <clipPath id="clip0_1250_13084">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ChartIcon