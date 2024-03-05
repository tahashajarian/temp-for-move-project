import {SideBarIconPropsType} from "../../../constance/dashboardLayout/sideBarItems";

function RoleIcon({className, textColor}: SideBarIconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...className && {className}}
    >
      <path
        className={`fill-current duration-200 ${textColor || 'text-gray-600'}`}
        fillRule="evenodd"
        d="M12 2.75a6.25 6.25 0 100 12.5 6.25 6.25 0 000-12.5zM4.25 9a7.75 7.75 0 1115.5 0 7.75 7.75 0 01-15.5 0z"
        clipRule="evenodd"
      ></path>
      <path
        className={`fill-current duration-200 ${textColor || 'text-gray-600'}`}
        fillRule="evenodd"
        d="M15.53 6.47a.75.75 0 010 1.06l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06L11 9.94l3.47-3.47a.75.75 0 011.06 0zM7 13.25a.75.75 0 01.75.75v6.675l3.864-2.318a.75.75 0 01.772 0l3.864 2.318V14a.75.75 0 111.5 0v8a.75.75 0 01-1.136.643L12 19.875l-4.614 2.768A.75.75 0 016.25 22v-8a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default RoleIcon