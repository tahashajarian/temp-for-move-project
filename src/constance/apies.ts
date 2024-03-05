const APIES = {
  LOGIN: "login",
  LOGIN_RESEND_OTP: "retryOTPLogin",
  FORGET_PASSWORD: "SmsForgotPassword",
  SMS_OTP_CHECK: "SmsOTPCheck",
  SMS_RESET_PASSWORD: "SmsResetPassword",
  CHANGE_PASSWORD: "ChangePassword",
  CAPTCHA: "Captcha/GetCaptcha",

  TWO_FACTOR_OTP: "OtpInfo/TwoFactorOtp",
  RESET_PASSWORD_OTP: "OtpInfo/ResetPasswordOtp",

  ORGANIZATION_LIST: "Organization/Selection",

  REGISTER: "Register/Prepare",
  REGISTER_OTP: "Register/Verify",
  REGISTER_SET_PASSWORD: "Register/Confirm",
  REGISTER_OTP_TIME: "Register/OtpTime",

  ADMIN_USERS_DETAIL: "AdminUsers/DetailUser",
  ADMIN_USERS_LIST: "AdminUsers/List",
  ADMIN_USERS_CHANGE_MOBILE_NUMBER: "AdminUsers/EditPhoneNumberBySuperAdmin",
  ADMIN_USERS_CHANGE_STATUS: "AdminUsers/ChangeStatusBySuperAdmin",
  ADMIN_USERS_CREATE_USER: "AdminUsers/createUser",
  ADMIN_USERS_CHANGE_PASSWORD: "AdminUsers/ChangePasswordBySuperAdmin",
  ADMIN_USERS_UPDATE: "AdminUsers/UpdateUser",
  ADMIN_USERS_USER_ROLES: "AdminUsers/GetUserRoles",
  ADMIN_USERS_USER_UPDATE_ROLES: "AdminUsers/UpdateUserRole",
  ADMIN_USERS_USER_DELETE_ROLE: "AdminUsers/DeleteUserRole",
  
  ROLE_CREATE: "AdminRoles/Create",
  ROLE_LIST: "AdminRoles/List",
  ROLE_UPDATE: "AdminRoles/Update",
  ROLE_DELETE: "AdminRoles/Delete",
  ROLE_PERMISSIONS: "RolePermissions/GetPermissionsByRole",
  
  USER_ROLE_PERMISSIONS: "RolePermissions/GetPermissionsByUser",
  EDIT_TWO_FACTOR: "/AdminUsers/EditTwoFactor",
  PROFILE_CHANGE_PASSWROD: "/AdminUsers/ChangePassword",
  PROFILE_CHANGE_MOBILE_NUMBER: "AdminUsers/EditPhoneNumber",
};

export default APIES;
