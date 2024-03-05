import {createBrowserRouter} from "react-router-dom";
import AuthPagesLayout from "../pages/auth/AuthPagesLayout";
import DashboardPagesLayout from "../pages/dashboard/DashboardPagesLayout";
import ROUTER_LINKS from "../constance/routerLinks";
import LoginPage from "../pages/auth/login/LoginPage";
import ErrorPage from "../components/others/ErrorPage/ErrorPage";
import ChangePasswordPage from "../pages/auth/change-password/ChangePasswordPage";
import ForgetPasswordPage from "../pages/auth/forget-password/ForgetPasswordPage";
import ForgetPasswordOtpPage from "../pages/auth/forget-password/otp/ForgetPasswordOtpPage";
import ForgetPasswordSetNewPassword from "../pages/auth/forget-password/set-new-password/ForgetPasswordSetNewPassword";
import LoginOtpPage from "../pages/auth/login/otp/LoginOtpPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import RegisterOtpPage from "../pages/auth/register/otp/RegisterOtpPage";
import RegisterSetPasswordPage from "../pages/auth/register/set-password/RegisterSetPasswordPage";
import ChartsPage from "../pages/dashboard/charts/ChartsPage";
import HomePage from "../pages/dashboard/home/HomePage";
import ProfilePage from "../pages/dashboard/profile/ProfilePage";
import RolePage from "../pages/dashboard/role/RolePage";
import SettingPage from "../pages/dashboard/setting/SettingPage";
import SupportPage from "../pages/dashboard/support/SupportPage";
import ProfileLayout from "../pages/dashboard/profile/ProfileLayout";
import AdminUserPage from "../pages/dashboard/manage-user/admin-user/AdminUserPage";
import SystemUserPage from "../pages/dashboard/manage-user/system-user/SystemUserPage";
import AdminUserDetailPage from "../pages/dashboard/manage-user/admin-user/[userId]/detail/AdminUserDetailPage";
import AdminUserRoleAndPermissionPage
  from "../pages/dashboard/manage-user/admin-user/[userId]/role-and-permission/AdminUserRoleAndPermissionPage";
import AdminUserDetailLayout from "../pages/dashboard/manage-user/admin-user/[userId]/AdminUserDetailLayout";


const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthPagesLayout />,
        children: [
          {
            path: ROUTER_LINKS.LOGIN,
            element: <LoginPage />
          },
          {
            path: ROUTER_LINKS.LOGIN_OTP,
            element: <LoginOtpPage />
          },

          {
            path: ROUTER_LINKS.CHANGE_PASSWORD,
            element: <ChangePasswordPage />
          },

          {
            path: ROUTER_LINKS.FORGET_PASSWORD,
            element: <ForgetPasswordPage />,
          },
          {
            path: ROUTER_LINKS.FORGET_PASSWORD_OTP,
            element: <ForgetPasswordOtpPage />
          },
          {
            path: ROUTER_LINKS.FORGET_PASSWORD_SET_NEW_PASSWORD,
            element: <ForgetPasswordSetNewPassword />
          },

          {
            path: ROUTER_LINKS.REGISTER,
            element: <RegisterPage />
          },
          {
            path: ROUTER_LINKS.REGISTER_OTP,
            element: <RegisterOtpPage />
          },
          {
            path: ROUTER_LINKS.REGISTER_SET_PASSWORD,
            element: <RegisterSetPasswordPage />
          },
        ]
      },
      {
        element: <DashboardPagesLayout />,
        children: [
          {
            path: ROUTER_LINKS.HOME,
            element: <HomePage />
          },

          {
            path: ROUTER_LINKS.MANAGE_ADMIN_USER_LIST,
            element: <AdminUserPage />
          },
          {
            element: <AdminUserDetailLayout />,
            children: [
              {
                path: `${ROUTER_LINKS.MANAGE_ADMIN_USER_LIST}/:userId/${ROUTER_LINKS.DETAIL}`,
                element: <AdminUserDetailPage />
              },
              {
                path: `${ROUTER_LINKS.MANAGE_ADMIN_USER_LIST}/:userId/${ROUTER_LINKS.ROLE_AND_PERMISSION}`,
                element: <AdminUserRoleAndPermissionPage />
              },
            ]
          },

          {
            path: ROUTER_LINKS.MANAGE_SYSTEM_USER_LIST,
            element: <SystemUserPage />
          },

          {
            path: ROUTER_LINKS.CHARTS,
            element: <ChartsPage />
          },

          {
            element: <ProfileLayout />,
            children: [
              {
                path: ROUTER_LINKS.PROFILE,
                element: <ProfilePage />
              },
            ]
          },

          {
            path: ROUTER_LINKS.ROLE,
            element: <RolePage />
          },

          {
            path: ROUTER_LINKS.SETTING,
            element: <SettingPage />
          },

          {
            path: ROUTER_LINKS.SUPPORT,
            element: <SupportPage />
          },

        ]
      }
    ]
  },
]);

export default router