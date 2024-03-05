import setToken, {TokenType} from "../../../utils/auth/setToken";
import Ls from "../../../utils/customLocalStorage";
import ROUTER_LINKS from "../../../constance/routerLinks";
import {useNavigate} from "react-router-dom";


type ResponseType = {
  data: TokenType
}

function useLoginToDashboard() {

  const navigate = useNavigate()

  function loginToDashboard(res: ResponseType) {

    Ls.clearNestedLocalStorage('LOGIN')
    Ls.clearNestedLocalStorage('LOGIN_OTP')

    const token:TokenType = {
      accessToken: res.data?.accessToken,
      refreshToken: res.data?.refreshToken
    }
    setToken(token)

    // const beforLoginUrlValue = Ls.get(beforeLoginUrl)
    // Ls.remove(beforeLoginUrl)
    //
    // const url = beforLoginUrlValue || ROUTER_LINKS.PROFILE
    const url = ROUTER_LINKS.PROFILE
    navigate(url)
  }

  return loginToDashboard
}

export default useLoginToDashboard