import {SideBarIconPropsType} from "../../constance/dashboardLayout/sideBarItems";

function LogoutIcon({className, textColor}: Pick<SideBarIconPropsType, 'className' | 'textColor'>) {
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
        className={`stroke-current duration-200 ${textColor || 'text-red-500'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
      ></path>
    </svg>
  )
}

export default LogoutIcon