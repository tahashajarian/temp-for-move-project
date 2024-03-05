import UserOutlinedIcon from "../../../../svg/UserOutlinedIcon";
import LogoutIcon from "../../../../svg/LogoutIcon";
import {Types} from "../../../../../types/types";
import routerLinks from "../../../../../constance/routerLinks";
import useLogout from "../../../../../hooks/auth/useLogout";
import {Link} from "react-router-dom";


type DropDownWithLinkItem = {
  link: string;
  onClick?: undefined;
}

type DropDownWithOnClickItem = {
  link?: undefined;
  onClick: () => void;
}

type DropDownItemsType = {
  name: string | Types['children'];
  icon: Types['children'];
} & (DropDownWithLinkItem | DropDownWithOnClickItem)

type Props = {
  closeDropDown: () => void
}

function ProfileDropDown({closeDropDown}: Props) {

  const logout = useLogout()

  const dropDownItems:DropDownItemsType[] = [
    {name: 'حساب کاربری', icon: <UserOutlinedIcon className='w-6 h-6' textColor='text-gray-500'/>, link: routerLinks.PROFILE},
    {name: <span className='text-red-500'>خروج</span>, icon: <LogoutIcon className='h-6 w-6' />, onClick: logout}
  ]

  return (
    <div className='bg-white border border-gray-300 divide-y divide-gray-300 rounded'>
      {dropDownItems.map((item, index) => {

        function onClickHandler(e:any) {
          if (item.onClick) {
            e.preventDefault()
            item.onClick()
          }

          closeDropDown()
        }

        return (
          <Link
            key={index} to={item.link || '#'} onClick={onClickHandler}
          >
            <button className='flex items-center space-x-reverse space-x-2 p-4 text-gray-800 duration-200 cursor-pointer hover:bg-gray-50 whitespace-nowrap min-w-[170px] select-none'>
              <span className='w-6 h-6 overflow-hidden'>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfileDropDown