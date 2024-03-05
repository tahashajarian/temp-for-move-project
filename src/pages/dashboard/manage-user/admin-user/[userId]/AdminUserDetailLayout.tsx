
import DashboardContainer from "../../../../../components/pages/dashboard/DashboardLayout/DashboardContainer";
import DashboardPadding from "../../../../../components/pages/dashboard/DashboardLayout/DashboardPadding";
import UserDetailContextProvider from "../../../../../contexts/AdminUserDetailContext";
import AdminUserDetailTopSection
  from "../../../../../components/pages/dashboard/manage-user/admin-user/AdminUserDetail/AdminUserDetailTopSection";
import {Outlet} from "react-router-dom";


function AdminUserDetailLayout() {

  return (
    <UserDetailContextProvider>
      <AdminUserDetailTopSection />
      <DashboardPadding>
        <DashboardContainer>
          <Outlet />
        </DashboardContainer>
      </DashboardPadding>
    </UserDetailContextProvider>
  )
}

export default AdminUserDetailLayout