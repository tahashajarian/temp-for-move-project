import {useLocation} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import SIDEBAR_ITEMS from "../../../../../constance/dashboardLayout/sideBarItems";
import sideBarItems from "../../../../../constance/dashboardLayout/sideBarItems";
import useGetActiveMainNavBasePathname from "./useGetActiveMainNavBasePathname";

function useDashboardSideBar() {

  const pathname = useLocation().pathname

  const getActiveMainNavBasePathname = useGetActiveMainNavBasePathname()

  const defaultActiveNav = useMemo(getActiveMainNavBasePathname, [pathname])

  const [activeNav, setActiveNav] = useState(defaultActiveNav?.name || '')

  const subMenus = useMemo(function () {
    const activeSideBar = SIDEBAR_ITEMS.find(item => item.name === activeNav)

    return activeSideBar?.subMenu || []
  }, [activeNav])

  const subMenuOpen = useMemo(function () {
    const navigation = sideBarItems.find(item => item.name === activeNav)
    if (!navigation) return false
    return navigation?.subMenu && navigation?.subMenu?.length > 1
  }, [activeNav])

  useEffect(() => {
    const activeMainNav = getActiveMainNavBasePathname()
    if (activeNav !== activeMainNav?.name) setActiveNav(activeMainNav?.name || '')
  }, [pathname]);

  return {
    subMenuOpen, subMenus, setActiveNav, activeNav,
  }
}

export default useDashboardSideBar