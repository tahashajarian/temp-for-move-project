const ROUTER_LINKS = {
  //base routes
  DETAIL: 'detail',
  ROLE_AND_PERMISSION: 'role-and-permission',

  //full routes
  LOGIN: '/auth/login',
  LOGIN_OTP: '/auth/login/otp',

  FORGET_PASSWORD: '/auth/forget-password',
  FORGET_PASSWORD_OTP: '/auth/forget-password/otp',
  FORGET_PASSWORD_SET_NEW_PASSWORD: '/auth/forget-password/set-new-password',

  REGISTER: '/auth/register',
  REGISTER_OTP: '/auth/register/otp',
  REGISTER_SET_PASSWORD: '/auth/register/set-password',

  CHANGE_PASSWORD: '/auth/change-password',

  HOME: '/dashboard/home',

  PROFILE: '/dashboard/profile',

  MANAGE_ADMIN_USER_LIST: '/dashboard/manage-user/admin-user',
  MANAGE_SYSTEM_USER_LIST: '/dashboard/manage-user/system-user',

  CHARTS: '/dashboard/charts',

  SUPPORT: '/dashboard/support',

  ROLE: '/dashboard/role',

  SETTING: '/dashboard/setting',
}

export default ROUTER_LINKS