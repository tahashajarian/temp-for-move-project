import {SelectOptionType} from "../../Select/Select";

export const userAccountCredentialFieldName = 'userAccountCredential'
export const userAccountCredentialLabel = 'اعتبار حساب کاربری'
export type UserAccountCredentialType = SelectOptionType;

export const USER_ACCOUNT_CREDENTIAL_OPTIONS_KEYS = {
  LIMITED: 'limited',
  UN_LIMITED: 'unLimited',
}

export const userAccountCredentialOptions:SelectOptionType[] = [
  {id: USER_ACCOUNT_CREDENTIAL_OPTIONS_KEYS.LIMITED, name: 'محدود'},
  {id: USER_ACCOUNT_CREDENTIAL_OPTIONS_KEYS.UN_LIMITED, name: 'نا محدود'},
]
