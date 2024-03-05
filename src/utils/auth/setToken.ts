// import Cookies from 'js-cookie'
// import COOKIES from "@/constance/cookies";
import {encrypt} from "./EncryptDecrypt";
import Ls from "../customLocalStorage";
import LS_KEYS from "../../constance/localStorageKeys";


export type TokenType = {
  accessToken: string;
  refreshToken: string;
}

async function setToken(token: TokenType, isMainServer?: boolean) {
  if (!token) return
  const encryptedToken = encrypt(JSON.stringify(token));

  Ls.add(LS_KEYS.ENCRYPTED_TOKEN, encryptedToken)

  // const config: any = {
  //   ...isMainServer ? {
  //     secure: true,
  //     sameSite: 'strict',
  //   } : {},
  //   expires: 1
  // }
  //
  // Cookies.set(COOKIES.token, encryptedToken, config)
}

export default setToken;