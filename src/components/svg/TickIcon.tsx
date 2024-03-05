import {SideBarIconPropsType} from "../../constance/dashboardLayout/sideBarItems";

function TickIcon({className, textColor}: Pick<SideBarIconPropsType, 'className' | 'textColor'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 17 17"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-green-700'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.188 9.031l4.25 4.25 6.375-9.562"
      ></path>
    </svg>
  )
}

export default TickIcon