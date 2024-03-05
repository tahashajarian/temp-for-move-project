import {SideBarIconPropsType} from "../../../constance/dashboardLayout/sideBarItems";

function SettingIcon({className, textColor}: SideBarIconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...className && {className}}
    >
      <g className={`fill-current duration-200 ${textColor || 'text-gray-600'}`} clipPath="url(#clip0_1250_13096)">
        <path
          d="M12 17c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-8.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"></path>
        <path
          d="M13.663 24h-3.326c-.8 0-1.507-.568-1.681-1.351l-.421-1.872a9.199 9.199 0 01-1.954-1.135l-1.823.576a1.733 1.733 0 01-2.024-.789L.776 16.562a1.748 1.748 0 01.32-2.134l1.414-1.299a10.082 10.082 0 01-.001-2.258L1.104 9.578A1.746 1.746 0 01.77 7.447l1.668-2.885c.387-.692 1.239-1.021 2.016-.782l1.826.577a9.197 9.197 0 011.954-1.135l.422-1.874C8.83.568 9.537 0 10.337 0h3.326c.8 0 1.507.568 1.68 1.351l.422 1.872c.686.291 1.34.671 1.954 1.135l1.823-.576c.784-.241 1.632.089 2.024.789l1.658 2.867c.397.71.263 1.584-.321 2.134l-1.413 1.299c.082.75.082 1.508 0 2.258l1.406 1.292.007.006c.584.55.719 1.424.326 2.125l-1.668 2.885c-.387.692-1.237 1.023-2.017.781l-1.826-.577a9.2 9.2 0 01-1.954 1.135l-.422 1.874a1.73 1.73 0 01-1.68 1.35zm-7.23-5.941a.75.75 0 01.478.171c.665.553 1.418.99 2.229 1.293a.75.75 0 01.472.539l.509 2.26a.225.225 0 00.217.178h3.326a.223.223 0 00.216-.176l.51-2.262a.748.748 0 01.472-.539 7.717 7.717 0 002.229-1.293.747.747 0 01.703-.137l2.2.695c.106.033.218-.006.266-.092l1.668-2.885a.245.245 0 00-.048-.289l-1.688-1.552a.75.75 0 01-.234-.663 8.91 8.91 0 00.099-1.308 8.91 8.91 0 00-.1-1.308.75.75 0 01.235-.663l1.692-1.556a.244.244 0 00.039-.294l-1.658-2.867a.23.23 0 00-.272-.1l-2.198.694a.75.75 0 01-.703-.137 7.703 7.703 0 00-2.23-1.293.75.75 0 01-.471-.539l-.51-2.26a.229.229 0 00-.218-.176h-3.326a.223.223 0 00-.216.176l-.51 2.262a.751.751 0 01-.472.539c-.81.303-1.564.74-2.228 1.293a.752.752 0 01-.703.137l-2.201-.695c-.103-.032-.217.006-.265.092L2.074 8.188a.245.245 0 00.05.292l1.687 1.549a.75.75 0 01.234.663 8.91 8.91 0 00-.1 1.308c0 .425.034.865.1 1.308a.75.75 0 01-.234.663l-1.692 1.556a.244.244 0 00-.04.294l1.659 2.867a.23.23 0 00.272.1l2.198-.694a.728.728 0 01.226-.035z"></path>
      </g>
      <defs>
        <clipPath id="clip0_1250_13096">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default SettingIcon