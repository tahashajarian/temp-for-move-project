import {useLocation} from "react-router-dom";
import SIDEBAR_ITEMS from "../../../../../constance/dashboardLayout/sideBarItems";

function useGetActiveMainNavBasePathname() {

  const pathname = useLocation().pathname

  function getActiveMainNavBasePathname() {
    const activeSideBar = SIDEBAR_ITEMS.find(item => {
      const activeSubMenu = item.subMenu.find(submenu => {
        return pathname.includes(submenu.link)
      })

      return Boolean(activeSubMenu)
    })

    return activeSideBar
  }

  return getActiveMainNavBasePathname
}

export default useGetActiveMainNavBasePathname