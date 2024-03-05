// import Cookies from 'js-cookie'
// import COOKIES from "@/constance/cookies";

import Ls from "../customLocalStorage";
import LS_KEYS from "../../constance/localStorageKeys";

function removeToken() {
  Ls.remove(LS_KEYS.ENCRYPTED_TOKEN)
  // Cookies.remove(COOKIES.token)
}

export default removeToken;