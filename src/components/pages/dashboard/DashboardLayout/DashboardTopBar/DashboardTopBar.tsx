import TypoAndLogo from "../../../../others/TypoAndLogo";
import NotificationIcon from "../../../../svg/NotificationIcon";
import UserOutlinedIcon from "../../../../svg/UserOutlinedIcon";
import ArrowIcon from "../../../../svg/ArrowIcon";
import IconClickable from "../../../../others/IconClickable";
import {topBarHeight} from "../../../../../constance/dashboardLayout/dashboardLayoutClasses";
import zIndexes from "../../../../../constance/zIndexes";
import DropDown from "../../../../others/DropDown/DropDown";
import {useState} from "react";
import ProfileDropDown from "./ProfileDropDown";

function DashboardTopBar({}) {

  const [dropDownOpen, setDropDownOpen] = useState(false)

  return (
    <div className={`flex items-center justify-between fixed top-0 inset-x-0 p-4 bg-white border-b border-gray-300 ${topBarHeight} ${zIndexes.topBar}`}>
      <div className='h-8 w-44 relative'>
        <TypoAndLogo />
      </div>

      <div className='flex items-center space-x-3 space-x-reverse'>
        <IconClickable>
          <NotificationIcon />
        </IconClickable>

        <DropDown
          dropDownOpen={dropDownOpen} setDropDownOpen={setDropDownOpen}
          dropDownElement={<ProfileDropDown closeDropDown={() => setDropDownOpen(false)} />}
          origin='left'
        >
          <IconClickable className='flex items-center space-x-1 space-x-reverse'>
            <UserOutlinedIcon textColor='text-gray-600' />
            <ArrowIcon />
          </IconClickable>
        </DropDown>
      </div>
    </div>
  )
}

export default DashboardTopBar