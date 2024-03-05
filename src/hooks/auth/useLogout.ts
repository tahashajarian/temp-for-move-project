import removeToken from "../../utils/auth/removeToken";
import ROUTER_LINKS from "../../constance/routerLinks";
import {useNavigate} from "react-router-dom";

function useLogout() {

  const navigate = useNavigate()

  function logoutHandler() {
    removeToken()
    navigate(ROUTER_LINKS.LOGIN)
  }

  return logoutHandler
}

export default useLogout