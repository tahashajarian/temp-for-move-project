import {SideBarIconPropsType} from "../../constance/dashboardLayout/sideBarItems";

function RepeatIcon({className, textColor}: Pick<SideBarIconPropsType, 'className' | 'textColor'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...className && {className}}
    >
      <path
        className={`fill-current duration-200 ${textColor || 'text-gray-500'}`}
        d="M17.031 9.166H12.97a.469.469 0 110-.937h3.594V4.635a.469.469 0 01.937 0v4.063a.469.469 0 01-.469.468z"
      ></path>
      <path
        fill="#6B7280"
        d="M10 17.5c-4.136 0-7.5-3.364-7.5-7.5S5.864 2.5 10 2.5c3.527 0 6.674 2.384 7.486 5.669a.47.47 0 01-.343.567.47.47 0 01-.567-.343C15.866 5.522 13.1 3.437 10 3.437A6.57 6.57 0 003.437 10 6.57 6.57 0 0010 16.563c1.752 0 3.399-.684 4.639-1.924a.469.469 0 11.663.664A7.45 7.45 0 0110 17.5z"
      ></path>
    </svg>
  )
}

export default RepeatIcon