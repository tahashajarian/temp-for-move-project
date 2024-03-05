
type Props = {
  textColor?: string;
  className?: string;
}

function UserOutlinedIcon({textColor, className}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="29"
      fill="none"
      viewBox="0 0 28 29"
      {...className && {className}}
    >
      <g clipPath="url(#clip0_1311_762)">
        <path
          className={`stroke-current ${textColor || ''}`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M20.98 22.346A8.736 8.736 0 0014 18.875a8.735 8.735 0 00-6.978 3.47m13.958 0a10.498 10.498 0 002.834-11.578A10.5 10.5 0 107.022 22.346m13.958 0A10.464 10.464 0 0114 25a10.46 10.46 0 01-6.978-2.654M17.5 11.875a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_1311_762">
          <path
            fill="#fff"
            d="M0 0H28V28H0z"
            transform="translate(0 .5)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default UserOutlinedIcon;
