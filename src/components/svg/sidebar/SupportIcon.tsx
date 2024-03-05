import {SideBarIconPropsType} from "../../../constance/dashboardLayout/sideBarItems";

function SupportIcon({className, textColor}: SideBarIconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...className && {className}}
    >
      <g
        className={`fill-current duration-200 ${textColor || 'text-gray-600'}`}
        fillRule="evenodd"
        clipPath="url(#clip0_1250_13087)"
        clipRule="evenodd"
      >
        <path
          d="M9.142 4.898C8.295 6.677 7.75 9.187 7.75 12c0 2.813.545 5.323 1.392 7.102.873 1.835 1.934 2.648 2.858 2.648.924 0 1.985-.813 2.858-2.648.847-1.779 1.392-4.289 1.392-7.102 0-2.813-.545-5.323-1.392-7.102C13.985 3.063 12.924 2.25 12 2.25c-.924 0-1.985.813-2.858 2.648zm-1.355-.645C8.723 2.287 10.163.75 12 .75c1.837 0 3.277 1.537 4.213 3.503.962 2.021 1.537 4.761 1.537 7.747 0 2.986-.575 5.726-1.537 7.747-.936 1.966-2.376 3.503-4.213 3.503-1.837 0-3.277-1.537-4.213-3.503C6.825 17.726 6.25 14.986 6.25 12c0-2.986.575-5.726 1.537-7.747z"></path>
        <path
          d="M1.25 9A.75.75 0 012 8.25h20a.75.75 0 110 1.5H2A.75.75 0 011.25 9zm0 6a.75.75 0 01.75-.75h20a.75.75 0 110 1.5H2a.75.75 0 01-.75-.75z"></path>
        <path
          d="M12 2.25A9.75 9.75 0 002.25 12 9.75 9.75 0 0012 21.75 9.75 9.75 0 0021.75 12 9.75 9.75 0 0012 2.25zM.75 12C.75 5.787 5.787.75 12 .75S23.25 5.787 23.25 12 18.213 23.25 12 23.25.75 18.213.75 12z"></path>
      </g>
      <defs>
        <clipPath id="clip0_1250_13087">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default SupportIcon