import {SideBarIconPropsType} from "../../constance/dashboardLayout/sideBarItems";

function PlusIcon({className, textColor}: Pick<SideBarIconPropsType, 'className' | 'textColor'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="19"
      fill="none"
      viewBox="0 0 18 19"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-accent'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 3.875v11.25M14.625 9.5H3.375"
      ></path>
    </svg>
  )
}

export default PlusIcon