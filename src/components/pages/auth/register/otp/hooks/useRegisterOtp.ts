import useReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import Ls from "../../../../../../utils/customLocalStorage";
import LS_KEYS from "../../../../../../constance/localStorageKeys";
import useAxios from "../../../../../../request/hooks/useAxios";
import useAuthOTP from "../../../AuthOTP/hooks/useAuthOTP";
import {toast} from "react-toastify";
import APIES from "../../../../../../constance/apies";
import {useNavigate} from "react-router-dom";
import ROUTER_LINKS from "../../../../../../constance/routerLinks";
import getUrlWithParams from "../../../../../../utils/getUrlWithParams";
import useSendOtpHandler from "../../hooks/useSendOtpHandler";
import QUERY_PARAMS from "../../../../../../constance/queryParams";
import {useEffect} from "react";

function useRegisterOtp() {
  const { formMethods, onSubmit } = useReactHookFormWrapper({
    onSubmitHandler,
  })

  const navigate = useNavigate()

  const [loginOtpResponse, loginOtpRequest] = useAxios()
  const [otpTimeResponse, otpTimeRequest] = useAxios()

  const mobile = Ls.get(LS_KEYS.REGISTER_OTP.MOBILE)
  const trackId = Ls.get(LS_KEYS.REGISTER_OTP.TRACK_ID)

  async function getOtpTime() {
    try {
      const url = APIES.REGISTER_OTP_TIME
      const params = {trackId}
      const response = await otpTimeRequest({url, params})
      return response?.data
    } catch (error) {
      navigate(ROUTER_LINKS.LOGIN, {replace: true})
    }
  }


  const {
    otpRef, countDownRef, startOtpTime, otpTimeLoading
  } = useAuthOTP({getOtpTime})

  useEffect(() => {
    startOtpTime()
  }, []);

  function onSubmitHandler(formData: any) {

    const params = {
      "trackId": trackId,
      "confirmCode": formData.otp,
    }

    const url = getUrlWithParams(APIES.REGISTER_OTP, params, true)
    loginOtpRequest({url, method: "POST"}).then((res) => {
      navigate(ROUTER_LINKS.REGISTER_SET_PASSWORD)
    }).catch(error => {
      otpRef?.current && otpRef?.current.clear()
      formMethods.reset()
    })
  }

  const {sendOtpHandler, loading:sendOtpLoading} = useSendOtpHandler()

  function resendOtpCode() {
    sendOtpHandler(() => {
      toast.success('کد با موفقیت ارسال گردید')
      startOtpTime()
      otpRef.current && otpRef.current.clear()
      formMethods.reset()
    })
  }

  function onBackHandler() {
    navigate(`${ROUTER_LINKS.REGISTER}?${QUERY_PARAMS.LOAD}=true`, {replace: true})
  }

  return {
    onSubmitHandler, otpRef, mobile, countDownRef, onSubmit, formMethods, onBackHandler,
    loading: loginOtpResponse.loading, resendOtpCode,
    resendOtpCodeLoading: sendOtpLoading || otpTimeLoading
  }
}

export default useRegisterOtp