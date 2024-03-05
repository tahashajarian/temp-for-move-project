import {SideBarIconPropsType} from "../../constance/dashboardLayout/sideBarItems";

function Arrow2Icon({className, textColor}: Pick<SideBarIconPropsType, 'className' | 'textColor'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className || 'w-6 h-6'}
    >
      <path
        className={`fill-current duration-200 ${textColor || 'text-[#111827]'}`}
        fillRule="evenodd"
        d="M2.25 12a.75.75 0 01.75-.75h16.19l-2.47-2.47a.75.75 0 111.06-1.06l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default Arrow2Icon