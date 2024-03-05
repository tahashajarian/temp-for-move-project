import {
  sidebarHeight,
  sidebarMainWidth, sidebarSubRight,
  sidebarSubWidth,
  sidebarTop
} from "../../../../constance/dashboardLayout/dashboardLayoutClasses";
import {SideBarItemType} from "../../../../constance/dashboardLayout/sideBarItems";
import {Link, useLocation} from "react-router-dom";
import zIndexes from "../../../../constance/zIndexes";
import {SetStateType} from "../../../../types/SetStateType";
import useGetActiveMainNavBasePathname from "./hooks/useGetActiveMainNavBasePathname";
import Tooltip from "../../../others/Tooltip/Tooltip";
import useGetSideBarItems from "./hooks/useGetSideBarItems";
import useGetSubMenus from "./hooks/useGetSubMenus";


type Props = {
  activeNav: string,
  setActiveNav: SetStateType<string>,
  subMenuOpen: boolean,
  subMenus: SideBarItemType['subMenu']
}

function DashboardSidebar({activeNav, setActiveNav, subMenuOpen, subMenus}: Props) {

  const pathname = useLocation().pathname
  const getActiveMainNavBasePathname = useGetActiveMainNavBasePathname()
  const sideBarItems = useGetSideBarItems()
  const filteredSubMenus = useGetSubMenus({subMenus})

  return (
    <>
      <div className={`flex flex-col fixed ${sidebarTop} ${sidebarHeight}
       ${zIndexes.sideBarMain}
       bg-white right-0 border-l border-gray-300 ${sidebarMainWidth}`}>
        {sideBarItems.map((item) => {
          const isActive = activeNav === item.name

          function onClick(e: any) {
            const hasMoreOneSubMenu = item.subMenu?.length > 1

            if (hasMoreOneSubMenu) {
              e.preventDefault()
              setActiveNav(item.name)
            } else {
              const activeMainNavBasePathname = getActiveMainNavBasePathname()
              if (activeMainNavBasePathname?.name === activeNav) return
              setActiveNav(activeMainNavBasePathname?.name || '')
            }
          }

          return (
            <Tooltip
              className='relative flex items-center justify-between w-full aspect-square duration-200 hover:bg-gray-100 cursor-pointer'
              key={item.name} title={item.label} placement='left'
            >
              <Link
                to={item.subMenu[0]?.link || '#'} onClick={onClick}
                className='flex w-full aspect-square'
              >
                <item.icon className='m-auto' textColor={isActive ? 'text-accent' : ''}/>

                <span
                  className={`absolute h-3/5 w-[3px] rounded-full bg-accent right-0 my-auto inset-y-0 duration-200 ${isActive ? '' : 'opacity-0 pointer-events-none scale-50'}`}></span>
              </Link>
            </Tooltip>
          )
        })}
      </div>

      <div
        className={`flex flex-col border-l border-gray-300 py-5 px-3 space-y-3 duration-300
         fixed ${sidebarTop} ${sidebarHeight} ${sidebarSubRight} bg-white ${zIndexes.sideBarSub}
         ${subMenuOpen ? `${sidebarSubWidth}` : 'translate-x-full pointer-events-none'}`}>
        <p className='text-gray-500'>{sideBarItems.find(item => item.name === activeNav)?.label}</p>
        {filteredSubMenus.map(item => {
          const isActive = pathname.includes(item.link)

          return (
            <Link
              to={item.link} key={item.link}
              className={`${isActive ? 'bg-custom-gray-4' : ''} flex items-center px-2 py-1.5 space-x-reverse space-x-1.5 duration-200 hover:bg-custom-gray-4 cursor-pointer rounded`}
            >
              <span
                className={`${isActive ? 'bg-accent' : ''} duration-200 rounded-sm border border-gray-300 w-2.5 h-2.5`}
              ></span>
              <div className={`text-base ${isActive ? 'font-medium' : 'text-gray-500'}`}>
                {item.label}
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default DashboardSidebar