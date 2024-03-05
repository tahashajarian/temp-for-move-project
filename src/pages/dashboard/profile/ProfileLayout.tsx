
import DashboardContainer from "../../../components/pages/dashboard/DashboardLayout/DashboardContainer";
import DashboardPadding from "../../../components/pages/dashboard/DashboardLayout/DashboardPadding";
import UserDetailContextProvider from "../../../contexts/AdminUserDetailContext";
import ProfileTitle from "../../../components/pages/dashboard/profile/ProfileTitle";
import { Titles} from "../../../constance/titles";
import {Outlet} from "react-router-dom";


function ProfileLayout() {
  return (
    <UserDetailContextProvider>
      <ProfileTitle title={Titles.PROFILE} />
      <DashboardPadding>
        <DashboardContainer>
          <Outlet />
        </DashboardContainer>
      </DashboardPadding>
    </UserDetailContextProvider>
  );
}

export default ProfileLayout;
