const LS_KEYS = {
  LOGIN: {
    NATIONAL_CODE: 'login-nationalCode',
    PASSWORD: 'login-password',
    SUCCESSFUL_MESSAGE_AFTER_REGISTER: 'login-successfulMessageAfterRegister',
  },

  LOGIN_OTP: {
    MOBILE: 'login-otp-mobile',
  },

  FORGET_PASSWORD: {
    NATIONAL_CODE: 'forgetPassword-nationalCode'
  },

  FORGET_PASSWORD_OTP: {
    MOBILE: 'forgetPassword-otp-mobile',
  },

  FORGET_PASSWORD_SET_NEW_PASSWORD: {
    TOKEN: 'forgetPassword-setNewPassword-token',
  },

  CHANGE_PASSWORD: {
    NATIONAL_CODE: 'changePassword-nationalCode',
    PASSWORD: 'changePassword-password',
  },

  REGISTER: 'register',

  REGISTER_SET_PASSWORD: {
    NATIONAL_CODE: 'changePassword-nationalCode',
    BIRTH_DATE: 'changePassword-password',
  },

  REGISTER_OTP: {
    MOBILE: 'registerOtp-mobile',
    TRACK_ID: 'registerOtp-trackId',
  },

  ENCRYPTED_TOKEN: 'encrypted-token'
}

export default LS_KEYS