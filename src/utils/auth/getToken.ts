// import Cookies from 'js-cookie'
// import COOKIES from "@/constance/cookies";
import {decrypt} from "./EncryptDecrypt";
import Ls from "../customLocalStorage";
import LS_KEYS from "../../constance/localStorageKeys";

function getToken() {
  // const cookieToken = Cookies.get(COOKIES.token)
  const encryptedToken = Ls.get(LS_KEYS.ENCRYPTED_TOKEN)
  if (!encryptedToken) return

  try {
    const decryptedToken = decrypt(encryptedToken)
    return JSON.parse(decryptedToken)
  } catch (err) {
    return
  }
}

export default getToken;