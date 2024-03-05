import DashboardIcon from "../../components/svg/sidebar/DashboardIcon";
import ManageUserIcon from "../../components/svg/sidebar/ManageUserIcon";
import ChartIcon from "../../components/svg/sidebar/ChartIcon";
import SupportIcon from "../../components/svg/sidebar/SupportIcon";
import RoleIcon from "../../components/svg/sidebar/RoleIcon";
import SettingIcon from "../../components/svg/sidebar/SettingIcon";
import ROUTER_LINKS from "../routerLinks";
import {JSX} from "react";
import PERMISSIONS_NAMES from "../permissionsNames";

export type SideBarIconPropsType = {
  className?: string,
  textColor?: string
}

export type SideBarItemType = {
  name: string;
  label: string;
  icon: ({className, textColor}: SideBarIconPropsType) => JSX.Element;
  permissionName: string;
  subMenu: {
    label: string;
    link: string;
    permissionName: string;
  }[]
}

export type SideBarItemsType = SideBarItemType[]


const  SIDEBAR_ITEMS: SideBarItemsType = [
  {
    name: 'dashboard',
    label: 'داشبورد',
    icon: DashboardIcon,
    permissionName: PERMISSIONS_NAMES.DASHBOARD,
    subMenu: [
      {
        label: 'داشبورد',
        link: ROUTER_LINKS.HOME,
        permissionName: PERMISSIONS_NAMES.DASHBOARD,
      },
    ]
  },
  {
    name: 'manage-user',
    label: 'مدیریت کاربران',
    icon: ManageUserIcon,
    permissionName: PERMISSIONS_NAMES.ADMIN_USER,
    subMenu: [
      {
        label: 'کاربران پنل مدیریتی',
        link: ROUTER_LINKS.MANAGE_ADMIN_USER_LIST,
        permissionName: PERMISSIONS_NAMES.ADMIN_USER_ADMIN_PANEL_USERS,
      },
      {
        label: 'کاربران سامانه',
        link: ROUTER_LINKS.MANAGE_SYSTEM_USER_LIST,
        permissionName: PERMISSIONS_NAMES.ADMIN_USER_SYSTEM_USER,
      },
    ]
  },
  {
    name: 'charts',
    label: 'گزارشات',
    icon: ChartIcon,
    permissionName: PERMISSIONS_NAMES.REPORTS,
    subMenu: [
      {
        label: 'گزارشات',
        link: ROUTER_LINKS.CHARTS,
        permissionName: PERMISSIONS_NAMES.REPORTS,
      },
    ]
  },
  {
    name: 'support',
    label: 'پشتیبانی',
    icon: SupportIcon,
    permissionName: PERMISSIONS_NAMES.SUPPORT,
    subMenu: [
      {
        label: 'پشتیبانی',
        link: ROUTER_LINKS.SUPPORT,
        permissionName: PERMISSIONS_NAMES.SUPPORT,
      },
    ]
  },
  {
    name: 'role',
    label: 'مدیریت نقش‌ها',
    icon: RoleIcon,
    permissionName: PERMISSIONS_NAMES.ROLE,
    subMenu: [
      {
        label: 'مدیریت نقش‌ها',
        link: ROUTER_LINKS.ROLE ,
        permissionName: PERMISSIONS_NAMES.ROLE,
      },
    ]
  },
  {
    name: 'setting',
    label: 'تنظیمات',
    icon: SettingIcon,
    permissionName: PERMISSIONS_NAMES.SETTING,
    subMenu: [
      {
        label: 'تنظیمات',
        link: ROUTER_LINKS.SETTING,
        permissionName: PERMISSIONS_NAMES.SETTING,
      },
    ]
  },
]

export default SIDEBAR_ITEMS