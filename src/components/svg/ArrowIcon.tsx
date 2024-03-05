import {SideBarIconPropsType} from "../../constance/dashboardLayout/sideBarItems";

function ArrowIcon({className, textColor}: Pick<SideBarIconPropsType, 'className' | 'textColor'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...className && {className}}
    >
      <path
        className={`stroke-current duration-200 ${textColor || 'text-gray-600'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13 5.5l-5 5-5-5"
      ></path>
    </svg>
  );
}

export default ArrowIcon;
