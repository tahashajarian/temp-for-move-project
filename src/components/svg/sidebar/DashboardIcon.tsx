import {SideBarIconPropsType} from "../../../constance/dashboardLayout/sideBarItems";


function DashboardIcon({className, textColor}: SideBarIconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...className && {className}}
    >
      <g clipPath="url(#clip0_1250_13074)">
        <path
          className={`fill-current duration-200 ${textColor || 'text-gray-600'}`}
          d="M9.25 8h-7.5C.785 8 0 7.215 0 6.25v-4.5C0 .785.785 0 1.75 0h7.5C10.215 0 11 .785 11 1.75v4.5C11 7.215 10.215 8 9.25 8zm-7.5-6.5a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-7.5zM9.25 24h-7.5C.785 24 0 23.215 0 22.25v-10.5C0 10.785.785 10 1.75 10h7.5c.965 0 1.75.785 1.75 1.75v10.5c0 .965-.785 1.75-1.75 1.75zm-7.5-12.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-10.5a.25.25 0 00-.25-.25h-7.5zM22.25 24h-7.5c-.965 0-1.75-.785-1.75-1.75v-4.5c0-.965.785-1.75 1.75-1.75h7.5c.965 0 1.75.785 1.75 1.75v4.5c0 .965-.785 1.75-1.75 1.75zm-7.5-6.5a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-7.5zm7.5-3.5h-7.5c-.965 0-1.75-.785-1.75-1.75V1.75C13 .785 13.785 0 14.75 0h7.5C23.215 0 24 .785 24 1.75v10.5c0 .965-.785 1.75-1.75 1.75zm-7.5-12.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-7.5z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_1250_13074">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default DashboardIcon;
