'use client'

import DashboardTopBar from "../../components/pages/dashboard/DashboardLayout/DashboardTopBar/DashboardTopBar";
import DashboardSidebar from "../../components/pages/dashboard/DashboardLayout/DashboardSidebar";
import {contentPadding, contentPaddingWhenSideBarIsClosed} from "../../constance/dashboardLayout/dashboardLayoutClasses";
import useDashboardSideBar from "../../components/pages/dashboard/DashboardLayout/hooks/useDashboardSideBar";
import UserPermissionsContextProvider from "../../contexts/UserPermissionsContext/UserPermissionsContext";
import {Outlet} from "react-router-dom";


function DashboardPagesLayout() {

  const {
    subMenuOpen, subMenus, setActiveNav, activeNav,
  } = useDashboardSideBar()

  return (
    <UserPermissionsContextProvider>
      <div>
        <DashboardTopBar />

        <DashboardSidebar
          subMenuOpen={subMenuOpen} subMenus={subMenus} setActiveNav={setActiveNav} activeNav={activeNav}
        />

        <div className={`${subMenuOpen ? contentPadding : contentPaddingWhenSideBarIsClosed} duration-300`}>
          <Outlet />
        </div>
      </div>
    </UserPermissionsContextProvider>
  )
}

export default DashboardPagesLayout