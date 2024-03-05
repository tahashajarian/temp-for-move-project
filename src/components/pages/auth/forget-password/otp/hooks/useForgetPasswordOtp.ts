import {useNavigate} from "react-router-dom";
import useAuthOTP from "../../../AuthOTP/hooks/useAuthOTP";
import ROUTER_LINKS from "../../../../../../constance/routerLinks";
import useAxios from "../../../../../../request/hooks/useAxios";
import APIES from "../../../../../../constance/apies";
import {toast} from "react-toastify";
import Ls from "../../../../../../utils/customLocalStorage";
import LS_KEYS from "../../../../../../constance/localStorageKeys";
import useReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import {getErrorMessage, getStatusCode} from "../../../../../../request/utils/getResponse";
import {useEffect} from "react";

function useForgetPasswordOtp() {
  const {formMethods, onSubmit} = useReactHookFormWrapper({
    onSubmitHandler,
  })

  const navigate = useNavigate()

  const [forgetPasswordOtpRes, forgetPasswordOtpRequest] = useAxios()
  const [resendOtpResponse, resendOtpRequest] = useAxios()
  const [otpTimeResponse, otpTimeRequest] = useAxios()

  const nationalCode = Ls.get(LS_KEYS.FORGET_PASSWORD.NATIONAL_CODE)
  const mobile = Ls.get(LS_KEYS.FORGET_PASSWORD_OTP.MOBILE)

  async function getOtpTime() {
    try {
      const url = APIES.RESET_PASSWORD_OTP
      const params = {userName: nationalCode}
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

    const data = {
      nationalCode: nationalCode,
      otp: formData.otp
    }

    const url = APIES.SMS_OTP_CHECK
    forgetPasswordOtpRequest({url, method: "POST", data}).then((res) => {
      if (getStatusCode(res) === 403) {
        toast.error(getErrorMessage(res))
        return navigate(ROUTER_LINKS.FORGET_PASSWORD, {replace: true})
      }

      Ls.add(LS_KEYS.FORGET_PASSWORD_SET_NEW_PASSWORD.TOKEN, res?.data?.result)
      navigate(ROUTER_LINKS.FORGET_PASSWORD_SET_NEW_PASSWORD)
    }).catch(error => {
      otpRef.current && otpRef.current.clear()
      formMethods.reset()
    })
  }

  function resendOtpCode() {
    const data = {
      "nationalCode": nationalCode,
    }

    const url = APIES.FORGET_PASSWORD
    resendOtpRequest({url, method: "POST", data, addCloudFlareCode: true}).then((res) => {
      toast.success('کد تأیید به شماره همراه شما ارسال گردید')
      otpRef?.current && otpRef?.current.clear()
      startOtpTime()
      otpRef?.current && otpRef?.current.clear()
      formMethods.reset()
    })
  }

  return {
    onSubmit, formMethods, otpRef, countDownRef, mobile,
    loading: forgetPasswordOtpRes.loading, resendOtpCode,
    resendOtpCodeLoading: resendOtpResponse.loading || otpTimeLoading
  }
}

export default useForgetPasswordOtp